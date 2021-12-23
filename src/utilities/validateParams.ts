import { Request } from 'express'
interface CustomParams {
  filename: string
  width: number
  height: number
}
const toN = (d: string) => (/^[0-9]+$/.test(d) ? parseInt(d, 10) : undefined)
export const handelParams = (
  req: Request
): [string | null, CustomParams | null] => {
  const filename = req.query.filename as string
  const width = toN(req.query.width as string)
  const height = toN(req.query.height as string)
  const files = [
    'encenadaport',
    'fjord',
    'icelandwaterfall',
    'palmtunnel',
    'santamonica',
  ]
  if (filename && width && height && files.includes(filename)) {
    return [null, { width, height, filename }]
  } else {
    const res = `
    <h1>Unsupported params </h2>
    <ul>
    ${filename ? ' ' : '<li> filename not found </li> '}
    ${
      files.includes(filename)
        ? ' '
        : '<li>the file ' + filename + ' not found </li> '
    }
    ${width ? ' ' : '<li> width not found </li> '}
    ${height ? ' ' : '<li> height not found </li> '}
    </ul>
    <br/>
    <h2> you can try the following links </h2>
    ${files.map(
      (f) =>
        `<p><a href="http://localhost:3000/resize?filename=${f}&width=200&height=200">${f}_200_200</a></p>`
    )}
    `
    return [res, null]
  }
}
