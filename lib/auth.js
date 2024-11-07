import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}
export async function decrypt(token) {
  try {
    let { payload } = await jwtVerify(token, key, {
      clockTolerance: 1000,
    });
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
