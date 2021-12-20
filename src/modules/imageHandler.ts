import * as fs from 'fs'
import sharp from 'sharp'
import path from 'path/posix'
import { Request, Response } from 'express'
import { handelParams } from './validateParams'
export const imageHandler = (req: Request, res: Response) => {
  const rootDir = path.resolve(__dirname, '..', '..')
  const [error, params] = handelParams(req)

  if (error === null && params !== null) {
    const { width, height, filename } = params
    const imgPath = path.resolve(
      rootDir,
      'public',
      'assets',
      'thumb',
      `${width}X${height}-${filename}.jpeg`
    )
    if (fs.existsSync(imgPath)) {
      res.set('Content-Type', 'image/jpeg')
      res.sendFile(imgPath)
    } else {
      fs.readFile(
        path.join(rootDir, 'public', 'assets', 'full', filename + '.jpg'),
        (err, img) => {
          if (err) {
            res.status(404)
            res.send(err)
          } else {
            sharp(img)
              .resize(width, height)
              .toFormat('jpeg')
              .toBuffer()
              .then((img) => {
                fs.writeFile(imgPath, img, (err) => {
                  if (err) {
                    throw err
                  } else {
                    res.status(200)
                    res.set('Content-Type', 'image/jpeg')
                    res.sendFile(imgPath)
                  }
                })
              })
              .catch((err) => {
                res.status(500)
                res.send('could not resize the image')
              })
          }
        }
      )
    }
  } else {
    //from this link i get the status code 422(Unprocessable Entity) Bad params
    //https://stackoverflow.com/questions/9454811/which-http-status-code-to-use-for-required-parameters-not-provided
    res.status(422)
    res.send(error)
  }
}
