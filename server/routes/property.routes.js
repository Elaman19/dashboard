import express from 'express'

import { createProperty, deleteProperty, getAllProperties, getPropertyDetail, updateProperty } from '../controllers/property.controller.js'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const router = express.Router()

router.route('/').get(getAllProperties)
router.route('/').post(createProperty)
router.route('/:id').get(getPropertyDetail)
router.route('/:id').delete(deleteProperty)
router.route('/:id').patch(updateProperty)

export default router