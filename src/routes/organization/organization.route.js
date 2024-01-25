import { Router } from "express";
import { createOrganization, getOrganizationById, deleteOrganization, updateOrganization, getOrganizations } from "../../controllers/organization/organization.controller.js";

export const organization_router = Router();
organization_router.get("/", getOrganizations);
organization_router.get("/:id", getOrganizationById);
organization_router.post("/", createOrganization);
organization_router.put("/:id", updateOrganization);
organization_router.delete("/:id", deleteOrganization);
