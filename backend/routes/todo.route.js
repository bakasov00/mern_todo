import { Router } from 'express'
import Todo from '../model/Todo.js'

const router = Router()

router.post('/add', async (req, res) => {
  try {
    const { text, userId } = req.body

    const todo = await Todo.create({
      text: text,
      owner: userId,
      completed: false,
      important: false,
    })

    res.status(200).json(todo)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query

    const todos = await Todo.find({ owner: userId })

    res.status(200).json(todos)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id })

    res.json(todo)
  } catch (err) {
    console.log(err)
  }
})

router.put('/completed/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    todo.completed = !todo.completed
    todo.save()
    res.json(todo)
  } catch (err) {
    console.log(err)
  }
})

router.put('/important/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    todo.important = !todo.important

    todo.save()
    res.json(todo)
  } catch (err) {
    console.log(err)
  }
})

export default router
