import { genSalt, hash, compare } from 'bcrypt';

const generatePassword = async (password: string) => {
  const salt = await genSalt(12);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  const passwordMatch = await compare(plainPassword, hashedPassword);
  return passwordMatch;
};

export { generatePassword, comparePasswords };
