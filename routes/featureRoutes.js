import express from 'express';
import {
  getAllFeatureRequest,
  handleFeatureAdd,
  handleVotes,
  handleComment,
  featureBySearchName,
  changeStatus,
} from '../controllers/featureController';
import { featureSchemaValidation } from '../middlewares/validationHelpers/featureSchemaValidation';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const router = express.Router();

// signup route
router.post('/add', featureSchemaValidation, verifyAuthToken, handleFeatureAdd);
router.get('/all', getAllFeatureRequest);
router.put('/vote', handleVotes);
router.put('/comment', handleComment);
router.put('/status-update', verifyAuthToken, changeStatus);
router.get('/search/:searchValue', featureBySearchName);

export default router;
