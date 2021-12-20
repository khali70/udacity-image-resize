import express from 'express'
import path from 'path'
import { imageHandler } from './modules/imageHandler'
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/resize', imageHandler)
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
  console.log('listening on http://localhost:3000')
})
export default app
