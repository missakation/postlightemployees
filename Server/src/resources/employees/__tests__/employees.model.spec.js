import { List } from '../employees.model'
import mongoose from 'mongoose'

//TEST THE SCHEMA OF EMPLOYEES
describe('employees model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = List.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      })
    })

    test('jobtitle', () => {
      
      const jobtitle = List.schema.obj.jobtitle
      expect(jobtitle).toEqual(
        {
          type: String,
          required: true,
          trim: true,
          maxlength: 50
        })
    })

    test('createdBy', () => {
      const createdBy = List.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      })
    })

  })
})
