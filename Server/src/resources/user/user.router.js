import { Router } from 'express'
import { myProfile, updateMe } from './user.controllers'

const router = Router()

router.get('/', myProfile)
router.put('/', updateMe)

export default router
