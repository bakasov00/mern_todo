import express from 'express'
import mongoose from 'mongoose'

import authRouter from './routes/auth.route.js'
import todoRouter from './routes/todo.route.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: true }))
app.use('/auth', authRouter)
app.use('/todo', todoRouter)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@clustermern.rwclv.mongodb.net/todo?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      },
    )

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
}

start()
