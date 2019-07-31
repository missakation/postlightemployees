import { getOne, createOne, updateOne, removeOne } from '../crud'
import { Employees } from '../../resources/employees/employees.model';
import mongoose from 'mongoose'


describe('crud controllers', () => {
  describe('getOne', async () => {
    test('finds by authenticated user and id', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const list = await Employees.create(
        {
          name: 'Missak',
          jobtitle: 'Programmer',
          department: 'Tech',
          city: 'Beirut',
          address: 'Bourj Hammoud',
          createdBy: user
        })

      const req = {
        params: {
          id: list._id
        },
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data._id.toString()).toBe(list._id.toString())
        }
      }

      await getOne(Employees)(req, res)
    })

    test('404 if no doc was found', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()

      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        },
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await getOne(Employees)(req, res)
    })
  })

  describe('createOne', () => {
    test('creates a new doc', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const body = {
        name: 'Missak',
        jobtitle: 'Programmer',
        department: 'Tech',
        city: 'Beirut',
        address: 'Bourj Hammoud',
        createdBy: user
      }

      const req = {
        user: { _id: user },
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.name).toBe(body.name)
        }
      }

      await createOne(Employees)(req, res)
    })

    test('createdBy should be the authenticated user', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const body = {
        name: 'Missak',
        jobtitle: 'Programmer',
        department: 'Tech',
        city: 'Beirut',
        address: 'Bourj Hammoud',
        createdBy: user
      }

      const req = {
        user: { _id: user },
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(`${results.data.createdBy}`).toBe(`${user}`)
        }
      }

      await createOne(Employees)(req, res)
    })
  })

  describe('updateOne', () => {
    test('finds doc by authenticated user and id to update', async () => {
      expect.assertions(3)

      const user = mongoose.Types.ObjectId()
      const list = await Employees.create(
        {
          name: 'Missak',
          jobtitle: 'Programmer',
          department: 'Tech',
          city: 'Beirut',
          address: 'Bourj Hammoud',
          createdBy: user
        })
      const update = { name: 'Missakation' }

      const req = {
        params: { id: list._id },
        user: { _id: user },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${list._id}`)
          expect(results.data.name).toBe(update.name)
        }
      }

      await updateOne(Employees)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const update = {
        name: 'Missak',
        jobtitle: 'Programmer',
        department: 'Tech',
        city: 'Beirut',
        address: 'Bourj Hammoud',
        createdBy: user
      }

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await updateOne(Employees)(req, res)
    })
  })

  describe('removeOne', () => {
    test('first doc by authenticated user and id to remove', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const list = await Employees.create(
        {
          name: 'Missak',
          jobtitle: 'Programmer',
          department: 'Tech',
          city: 'Beirut',
          address: 'Bourj Hammoud',
          createdBy: user
        })

      const req = {
        params: { id: list._id },
        user: { _id: user }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${list._id}`)
        }
      }

      await removeOne(Employees)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(2)
      const user = mongoose.Types.ObjectId()

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await removeOne(Employees)(req, res)
    })
  })
})
