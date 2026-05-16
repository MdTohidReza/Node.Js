import { Response } from 'express';
import { FilterQuery } from 'mongoose';
import { AuthRequest, ILead, LeadStatus, LeadSource, SortOrder } from '../types';
import Lead from '../models/Lead';
import { sendSuccess, sendError, buildPaginationMeta } from '../utils/response';

// GET /api/leads
export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      status,
      source,
      search,
      sort = 'latest',
    } = req.query as {
      page?: string;
      limit?: string;
      status?: LeadStatus;
      source?: LeadSource;
      search?: string;
      sort?: SortOrder;
    };

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build filter query
    const filter: FilterQuery<ILead> = {};

    if (status) filter.status = status;
    if (source) filter.source = source;

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const sortOrder = sort === SortOrder.OLDEST ? 1 : -1;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('createdBy', 'name email')
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    const pagination = buildPaginationMeta(total, pageNum, limitNum);

    sendSuccess(res, 'Leads fetched successfully', { items: leads, pagination });
  } catch {
    sendError(res, 'Failed to fetch leads', 500);
  }
};

// GET /api/leads/:id
export const getLeadById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('createdBy', 'name email')
      .lean();

    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    sendSuccess(res, 'Lead fetched successfully', lead);
  } catch {
    sendError(res, 'Failed to fetch lead', 500);
  }
};

// POST /api/leads
export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'Not authenticated', 401);
      return;
    }

    const { name, email, status, source, notes } = req.body as {
      name: string;
      email: string;
      status?: LeadStatus;
      source: LeadSource;
      notes?: string;
    };

    const lead = await Lead.create({
      name,
      email,
      status: status ?? LeadStatus.NEW,
      source,
      notes,
      createdBy: req.user.id,
    });

    const populated = await lead.populate('createdBy', 'name email');

    sendSuccess(res, 'Lead created successfully', populated, 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate')) {
      sendError(res, 'A lead with this email already exists', 409);
      return;
    }
    sendError(res, 'Failed to create lead', 500);
  }
};

// PUT /api/leads/:id
export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'Not authenticated', 401);
      return;
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    const { name, email, status, source, notes } = req.body as Partial<ILead>;

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, status, source, notes },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    sendSuccess(res, 'Lead updated successfully', updated);
  } catch {
    sendError(res, 'Failed to update lead', 500);
  }
};

// DELETE /api/leads/:id
export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'Not authenticated', 401);
      return;
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    await Lead.findByIdAndDelete(req.params.id);
    sendSuccess(res, 'Lead deleted successfully');
  } catch {
    sendError(res, 'Failed to delete lead', 500);
  }
};

// GET /api/leads/export/csv
export const exportLeadsCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search } = req.query as {
      status?: LeadStatus;
      source?: LeadSource;
      search?: string;
    };

    const filter: FilterQuery<ILead> = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search?.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const leads = await Lead.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    const headers = ['ID', 'Name', 'Email', 'Status', 'Source', 'Notes', 'Created At'];
    const rows = leads.map((l) => [
      l._id.toString(),
      `"${l.name}"`,
      l.email,
      l.status,
      l.source,
      `"${l.notes ?? ''}"`,
      new Date(l.createdAt).toISOString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="leads-${Date.now()}.csv"`);
    res.status(200).send(csv);
  } catch {
    sendError(res, 'Failed to export leads', 500);
  }
};
