import * as fs from 'fs/promises'
import { exists, existsSync } from 'fs'
import sharp from 'sharp'
import path from 'path'
interface CustomParams {
  filename: string
  width: number
  height: number
}
type state = { state: 'success' | 'fail'; err?: string }
export const imageHandler = async (
  { width, height, filename }: CustomParams,
  imgPath: string
): Promise<state> => {
  const rootDir = path.resolve(__dirname, '..', '..')
  const thumb = path.resolve(rootDir, 'public', 'assets', 'thumb')
  if (existsSync(imgPath)) {
    return { state: 'success' }
  }
  try {
    const img = await fs.readFile(
      path.join(rootDir, 'public', 'assets', 'full', filename + '.jpg')
    )
    const newImage = await sharp(img)
      .resize(width, height)
      .toFormat('jpeg')
      .toBuffer()
    // '/Users/joe/test.txt', content, { flag: 'a+' }, err => {}
    if (!existsSync(thumb)) await fs.mkdir(thumb)
    await fs.writeFile(path.resolve(imgPath), newImage, { flag: 'a+' })

    return { state: 'success' }
  } catch (err) {
    return { state: 'fail', err: 'could not resize the image' }
  }
}
