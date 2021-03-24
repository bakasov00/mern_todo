import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Types.ObjectId, ref: 'Todo' }],
})

export default new mongoose.model('User', schema)
