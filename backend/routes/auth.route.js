import { Router } from 'express'
import User from '../model/User.js'
import validate from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

router.post(
  '/registration',
  [validate.check('email', 'Не корректный Email').isEmail()],
  validate.check('password', 'Не коректный пароль').isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validate.validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные',
        })
      }
      const { email, password } = req.body

      const isUsed = await User.findOne({ email })

      if (isUsed) {
        return res.status(300).json({ message: 'Такой пользователь уже есть' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await User.create({ email, password: hashedPassword })
      res.status(201).json(user)
    } catch (err) {
      console.log(err)
    }
  },
)

router.post(
  '/login',
  [
    validate.check('email', 'Не корректный Email').isEmail(),
    validate.check('password', 'Не коректный пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validate.validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные',
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Такого пользователя нет' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const jwtSecret = 'fsdfd'
      const token = jwt.sign({ userEmail: user._id }, jwtSecret, { expiresIn: '5h' })

      res.status(200).json({ token, userId: user._id })
    } catch (err) {
      console.log(err)
    }
  },
)

export default router
