// environment configuration
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env')});
export default {
  service: {
    port: 3000
  },
  source: {
    url: "https://hiring.zumata.xyz/job01"
  },
  // added database configration from .env file
  db: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
  }
}