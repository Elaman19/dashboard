import mongoose from 'mongoose'

const connectDB = (url) => {
  mongoose.set('strictQuery', true)

  mongoose.connect(url)
    .then(() => console.log('Mongo connected'))
    .catch((error) => console.error('error while connecting to mongo', error))
}

export default connectDB