import Property from '../mongodb/models/property.js'
import User from '../mongodb/models/user.js'
import { v2 as cloudinary } from 'cloudinary'

const getAllProperties = async (req, res) => {}
const getPropertyDetail = async (req, res) => {}

const createProperty = async (req, res) => {
  const {title, description, propertyType, location, price, photo, email} = req.body

  // Start a new session
  const session = await mongoose.startSession();
  session.startTransaction()

  const user = await User.findOne({email}).session(session)

  if (!user)
    throw new Error('User not found')

  const photoUrl = await cloudinary.uploader.upload(photo)

  const newProperty = await Property.create({
    title, 
    description, 
    propertyType, 
    location, 
    price, 
    photo: photoUrl.url, 
    creator: user._id
  })

  user.allProperties.push(newProperty._id)
  await user.save({session})
  await session.commitTransaction()
  res.status(200).json({message: 'Property created successfully'})
}

const updateProperty = async (req, res) => {}
const deleteProperty = async (req, res) => {}

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty
}