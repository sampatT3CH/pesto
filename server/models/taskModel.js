import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  user_id: { type: String},
  description: { type: String },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  dueDate: { type: Date },
});

export default mongoose.model("Task", taskSchema);
