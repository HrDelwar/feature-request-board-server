import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Auth' },
  title: { type: String, required: true },
  logo: String,
  votes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Auth',
  },
  comments: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Auth',
        },
        message: { type: String, required: true },
        createdAt: { type: Date },
      },
    ],
  },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['under-review', 'planned', 'in-progress', 'complete'],
  },
  createdAt: { type: Date, default: new Date() },
});

const Feature = mongoose.model('Feature', featureSchema);

export default Feature;
