import fs from "fs";
import crypto from "crypto";

// 🔐 generate secure random key
function genSecret(size = 64) {
  return crypto.randomBytes(size).toString("hex");
}

// 🧩 build env content
const envContent = `
JWT_SECRET=${genSecret(32)}
REFRESH_SECRET=${genSecret(32)}
MONGO_URI=mongodb://localhost:27017/authdb
PORT=3000
`.trim();

// 💾 write .env file
fs.writeFileSync(".env", envContent);

console.log("✅ .env generated successfully!");
console.log(envContent);
