import * as jwt from "jsonwebtoken";

export default function (req) {
  let auth = req.headers['authorization']
  
  if (auth) {
    let token = auth.substring(`Bearer `.length)
    let decoded = jwt.verify(token, process.env.SECRET || 'development-secret')
    return decoded
  } else {
    return { error: 'no (Authorization: Bearer <jwt>) was found in the HTTP header' }
  }
}