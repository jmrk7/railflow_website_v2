// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPricing } from "../controllers/pricing";
import Cors from "cors";
import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile("pages/api/config/pricing.json");
const db = new Low(adapter);

const cors = Cors({
  origin: process.env.ALLOWED_DOMAINS,
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: "*",
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res, next) {
  await runMiddleware(req, res, cors);

  if (req.method === "PATCH") {
    await db.read();

    const { license, item, newValue } = req.body;
    
    const configs = db.data;

    configs[license][item] = Number(newValue);

    db.data = configs;

    await db.write();

    res.send(db.data);
  }

  else return getPricing(req, res, next);
}
