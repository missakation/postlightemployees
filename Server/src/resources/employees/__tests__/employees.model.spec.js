import { Employees } from '../employees.model'
import mongoose from 'mongoose'

//TEST THE SCHEMA OF EMPLOYEES
describe('employees model', () => {
  describe('schema', () => {

    test('name', () => {
      const name = Employees.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      })
    })

    test('jobtitle', () => {

      const jobtitle = Employees.schema.obj.jobtitle
      expect(jobtitle).toEqual(
        {
          type: String,
          required: true,
          trim: true,
          maxlength: 50
        })
    })

    test('city', () => {
      const city = Employees.schema.obj.city
      expect(city).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      })
    })

    test('address', () => {
      const address = Employees.schema.obj.address
      expect(address).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      })
    })

    test('department', () => {
      const department = Employees.schema.obj.department
      expect(department).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      })
    })

    test('mediaUrl', () => {
      const mediaUrl = Employees.schema.obj.mediaUrl
      expect(mediaUrl).toEqual({
        type: String,
        trim: true,
        maxlength: 100
      })
    })

    test('mediaUrlFull', () => {
      const mediaUrlFull = Employees.schema.obj.mediaUrlFull
      expect(mediaUrlFull).toEqual({
        type: String,
        trim: true,
        maxlength: 100
      })
    })

    test('createdBy', () => {
      const createdBy = Employees.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      })
    })

  })
})
