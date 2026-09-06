import express from 'express';
import {
  getAppliances,
  getApplianceById,
  createAppliance,
  toggleApplianceStatus,
  updateAppliance,
  deleteAppliance,
} from '../controllers/applianceController.js';

const router = express.Router();

router.route('/')
  .get(getAppliances)
  .post(createAppliance);

router.route('/:id')
  .get(getApplianceById)
  .put(updateAppliance)
  .delete(deleteAppliance);

router.patch('/:id/toggle', toggleApplianceStatus);

export default router;
