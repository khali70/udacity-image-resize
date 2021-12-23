import app from '../index'
import { imageHandler } from '../utilities/imageHandler'
import supertest from 'supertest'
import * as fs from 'fs/promises'
import path from 'path'
const imagePath =
  '/home/khali/code/udacity/session2/public/assets/full/palmtunnel.jpg'
describe('A spec', function () {
  const rmCache = () => {
    const thumbs = path.resolve(
      __dirname,
      ...'../../public/assets/thumb'.split('/')
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
  it('check for invalid dimensions', async (done) => {
    const { state, err } = await imageHandler(
      {
        width: 2000000000,
        height: 2000000000,
        filename: 'palmtunnel',
      },
      imagePath
    )
    expect(state).toEqual('fail')
    done()
  })
  afterAll(rmCache)
})
