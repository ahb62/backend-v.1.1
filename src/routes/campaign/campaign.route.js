import {Router} from 'express';
import { createCampaign, getCampaignById, deleteCampaign, updateCampaign, getCampaigns } from '../../controllers/campaign/campaign.controller.js';

export const campaign_router = Router();

campaign_router.get('/', getCampaigns);

campaign_router.get('/:id', getCampaignById);

campaign_router.post('/', createCampaign);

campaign_router.put('/:id', updateCampaign);

campaign_router.delete('/:id', deleteCampaign);