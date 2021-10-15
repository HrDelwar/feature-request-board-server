import mongoose from 'mongoose';

const formSchema = new mongoose.Schema(
  {
    requestForm: [mongoose.Schema.Types.Mixed],
    createdAt: { type: Date, default: new Date() },
  },
  { strict: false }
);

const Form = mongoose.model('Form', formSchema);

export default Form;
