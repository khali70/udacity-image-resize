import { Request } from 'express'
interface CustomParams {
  filename: string
  width: number
  height: number
}
export const handelParams = (
  req: Request
): [string | null, CustomParams | null] => {
  const filename = req.query.filename as string
  const width = parseInt(req.query.width as string, 10)
  const height = parseInt(req.query.height as string, 10)
  const params = { filename, width, height }
  const files = [
    'encenadaport',
    'fjord',
    'icelandwaterfall',
    'palmtunnel',
    'santamonica',
  ]
  if (filename && width && height && files.includes(filename)) {
    return [null, params]
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
