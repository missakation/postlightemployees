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
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    department: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    mediaUrl: {
      type: String,
      trim: true,
      maxlength: 100
    },
    mediaUrlFull: {
      type: String,
      trim: true,
      maxlength: 100
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

export const Employees = mongoose.model('employees', listEmployees)
