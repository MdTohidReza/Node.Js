# 📡 Smart Leads Dashboard — API Documentation

**Base URL:** `http://localhost:5000/api`  
**Content-Type:** `application/json`  
**Authentication:** Bearer Token (JWT)

---

## Response Format

All endpoints return a consistent JSON envelope:

```json
{
  "success": true | false,
  "message": "Human-readable message",
  "data": { ... }      // present on success
}
```

---

## 🔐 Auth Endpoints

### POST `/auth/register`

Register a new user.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "role": "sales"        // optional: "admin" | "sales" (default: "sales")
}
```

**Success `201`:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "64f1a2...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "sales"
    }
  }
}
```

**Errors:**
| Code | Reason |
|------|--------|
| 409  | Email already exists |
| 422  | Validation failed |

---

### POST `/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Success `200`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "64f1a2...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "sales"
    }
  }
}
```

**Errors:**
| Code | Reason |
|------|--------|
| 401  | Invalid credentials |
| 422  | Validation failed |

---

### GET `/auth/me`

Get currently authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Success `200`:**
```json
{
  "success": true,
  "message": "User fetched",
  "data": {
    "id": "64f1a2...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "sales",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 👥 Leads Endpoints

> All leads endpoints require `Authorization: Bearer <token>` header.

---

### GET `/leads`

Get a paginated list of leads with optional filters.

**Query Parameters:**

| Parameter | Type   | Default  | Description |
|-----------|--------|----------|-------------|
| `page`    | number | `1`      | Page number |
| `limit`   | number | `10`     | Records per page (max 100) |
| `status`  | string | —        | Filter: `New` \| `Contacted` \| `Qualified` \| `Lost` |
| `source`  | string | —        | Filter: `Website` \| `Instagram` \| `Referral` |
| `search`  | string | —        | Search by name or email (case-insensitive) |
| `sort`    | string | `latest` | Sort order: `latest` \| `oldest` |

**Example:** `GET /leads?status=Qualified&source=Instagram&search=rahul&page=1&limit=10`

**Success `200`:**
```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": {
    "items": [
      {
        "_id": "64f1b3...",
        "name": "Rahul Sharma",
        "email": "rahul@example.com",
        "status": "Qualified",
        "source": "Instagram",
        "notes": "Interested in enterprise plan",
        "createdBy": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        },
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### GET `/leads/:id`

Get a single lead by ID.

**Success `200`:**
```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "_id": "64f1b3...",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "Qualified",
    "source": "Instagram",
    "notes": "Interested in enterprise plan",
    "createdBy": { "name": "Jane Doe", "email": "jane@example.com" },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

**Errors:**
| Code | Reason |
|------|--------|
| 404  | Lead not found |

---

### POST `/leads`

Create a new lead.

**Request Body:**
```json
{
  "name": "Priya Kapoor",
  "email": "priya@example.com",
  "source": "Website",
  "status": "New",          // optional, default: "New"
  "notes": "Met at conference"  // optional
}
```

**Success `201`:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "64f1b4...",
    "name": "Priya Kapoor",
    "email": "priya@example.com",
    "status": "New",
    "source": "Website",
    "notes": "Met at conference",
    "createdBy": { "name": "Jane Doe", "email": "jane@example.com" },
    "createdAt": "2024-01-15T14:00:00.000Z",
    "updatedAt": "2024-01-15T14:00:00.000Z"
  }
}
```

**Errors:**
| Code | Reason |
|------|--------|
| 422  | Validation failed |

---

### PUT `/leads/:id`

Update an existing lead. All fields are optional (partial update).

**Request Body:**
```json
{
  "status": "Contacted",
  "notes": "Called on 15 Jan, scheduling demo"
}
```

**Success `200`:**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": { ...updatedLead }
}
```

**Errors:**
| Code | Reason |
|------|--------|
| 404  | Lead not found |
| 422  | Validation failed |

---

### DELETE `/leads/:id`

Delete a lead. **Admin role required.**

**Success `200`:**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

**Errors:**
| Code | Reason |
|------|--------|
| 403  | Forbidden — Admin role required |
| 404  | Lead not found |

---

### GET `/leads/export/csv`

Export leads as a CSV file (respects same filters as GET /leads, excluding pagination).

**Query Parameters:** `status`, `source`, `search` (same as GET /leads)

**Response:** `text/csv` file download

**Headers returned:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="leads-1705329600000.csv"
```

**CSV Columns:** `ID, Name, Email, Status, Source, Notes, Created At`

---

## 🏥 Health Check

### GET `/health`

Check if the API is running.

**Success `200`:**
```json
{
  "success": true,
  "message": "Smart Leads API is running 🚀",
  "timestamp": "2024-01-15T14:00:00.000Z"
}
```

---

## 📊 Status Codes Reference

| Code | Meaning |
|------|---------|
| 200  | OK |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized (missing/invalid token) |
| 403  | Forbidden (insufficient role) |
| 404  | Not Found |
| 409  | Conflict (duplicate) |
| 422  | Unprocessable Entity (validation error) |
| 429  | Too Many Requests (rate limit: 100 req/15 min) |
| 500  | Internal Server Error |

---

## 🔢 Enums Reference

### Lead Status
| Value | Description |
|-------|-------------|
| `New` | Freshly added lead |
| `Contacted` | Initial contact made |
| `Qualified` | Confirmed as a real prospect |
| `Lost` | Lead dropped out |

### Lead Source
| Value | Description |
|-------|-------------|
| `Website` | Via website form or visit |
| `Instagram` | Via Instagram DMs or ads |
| `Referral` | Referred by an existing contact |

### User Role
| Value | Description |
|-------|-------------|
| `admin` | Full access including delete |
| `sales` | Create, read, update only |
