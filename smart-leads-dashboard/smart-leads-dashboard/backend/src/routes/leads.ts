import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/leadsController';
import { authenticate, authorize } from '../middleware/auth';
import {
  createLeadValidator,
  updateLeadValidator,
  leadQueryValidator,
  validate,
} from '../middleware/validators';
import { UserRole } from '../types';

const router = Router();

// All lead routes require authentication
router.use(authenticate);

router.get('/export/csv', exportLeadsCSV);
router.get('/', leadQueryValidator, validate, getLeads);
router.get('/:id', getLeadById);
router.post('/', createLeadValidator, validate, createLead);
router.put('/:id', updateLeadValidator, validate, updateLead);
router.delete('/:id', authorize(UserRole.ADMIN), deleteLead);

export default router;
