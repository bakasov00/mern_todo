import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  text: { type: String },
  completed: false,
  important: false,
})

export default new mongoose.model('Todo', schema)
