import bcrypt from 'bcrypt'

async function hashPassword(plaintextPassword) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(plaintextPassword, salt)
}

export default hashPassword
