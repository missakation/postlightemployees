import mongoose from 'mongoose'
import options from '../config'

//GET DBURL BASED ON ENV
export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true }
  )
}
