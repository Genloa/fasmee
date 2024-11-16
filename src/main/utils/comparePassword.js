import bcrypt from 'bcrypt'

async function comparePassword(plaintextPassword, hash) {
  return await bcrypt.compare(plaintextPassword, hash)
}

export default comparePassword
