import app from '../index'
import supertest from 'supertest'
import * as fs from 'fs/promises'
import path from 'path'
const request = supertest(app)

describe('A spec', function () {
  const rmCache = () => {
    const thumbs = path.resolve(
      __dirname,
      ...'../public/assets/thumb'.split('/')
    )
    fs.readdir(thumbs)
      .then((files) => {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          fs.rm(path.resolve(thumbs, file))
        }
      })
      .catch((err) => console.error(err))
  }
  beforeAll(rmCache)

  it('check static route configured', async (done) => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    done()
  })
  it('check at /resize no params error handel', async (done) => {
    const response = await request.get('/resize')
    expect(response.status).toBe(422)

    request
      .get('/resize?filenme=encenadaport&wdth=200&height=200')
      .then((response) => {
        expect(response.status).toBe(422)
      })

    request
      .get('/resize?filename=encenadaport&wdth=200&height=200')
      .then((response) => {
        expect(response.status).toBe(422)
      })

    request
      .get('/resize?filename=encenadaport&width=200&heght=200')
      .then((response) => {
        expect(response.status).toBe(422)
      })

    request
      .get('/resize?filename=encenadaport&width=20a0&height=200')
      .then((response) => {
        expect(response.status).toBe(422)
      })

    request
      .get('/resize?filename=encenadaport&width=200&height=20a0')
      .then((response) => {
        expect(response.status).toBe(422)
      })
    done()
  })
  it('check for invalid dimensions', async (done) => {
    const response = await request.get(
      '/resize?filename=encenadaport&width=1000000&height=100000'
    )
    expect(response.status).toBe(500)
    done()
  })
  it('should return resized image', async (done) => {
    request
      .get('/resize?filename=encenadaport&width=200&height=200')
      .expect('Content-Type', 'image/jpeg')
      .expect(200, done)
  })
  afterAll(rmCache)
})
