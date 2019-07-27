import mongoose from 'mongoose'

const listEmployees = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    jobtitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user' //RELATION
    }
  },
  { timestamps: true }
)

//CREAT INDEX FOR NAME FIELD
listEmployees.index({ name: 1 }, { unique: true })

export const List = mongoose.model('employees', listEmployees)
