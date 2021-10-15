import express from 'express';
import {
  addFormField,
  getForm,
  updateForm,
} from '../controllers/formController';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const router = express.Router();

// signup route
router.post('/add-field', verifyAuthToken, addFormField);

router.get('/', getForm);
router.put('/update', verifyAuthToken, updateForm);

export default router;
