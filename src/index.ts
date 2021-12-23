import express from 'express'
import path from 'path'
import { handelParams } from './utilities/validateParams'
import { imageHandler } from './utilities/imageHandler'
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/resize', async (req, res) => {
  const rootDir = path.resolve(__dirname, '..')
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
    const { state, err } = await imageHandler(params, imgPath)
    if (state === 'success') {
      res.status(200)
      res.set('Content-Type', 'image/jpeg')
      res.sendFile(imgPath)
    } else {
      res.status(500)
      res.send(err || 'cant resize the image')
    }
  } else {
    //from this link i get the status code 422(Unprocessable Entity) Bad params
    //https://stackoverflow.com/questions/9454811/which-http-status-code-to-use-for-required-parameters-not-provided
    res.status(422)
    res.send(error)
  }
})
// 404 route
app.use((req, res) => {
  res.status(404)
  res.send(`
  <h1> Error 404 </h1>
  try 
  <p> 
  <a> http://localhost:3000</a> 
  </p>
  `)
})
app.listen(3000, function () {
  console.log('server is working')
  console.log(
    'http://localhost:3000/resize?filename=palmtunnel&width=200&height=200'
  )
})
export default app
