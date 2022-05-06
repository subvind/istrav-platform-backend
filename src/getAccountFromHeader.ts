
export default function (req) {
  let auth = req.headers['Authorization']
  if (auth) {
    let s = auth.substring(`Bearer `.length)
    let b = Buffer.from(s, "base64")
    let token = b.toString("utf8")
    return JSON.parse(token)
  } else {
    return { error: 'no {Bearer <jwt>} was found in the "Authorization" header' }
  }
}