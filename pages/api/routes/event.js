// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createEvent } from "../controllers/event";

import Cors from "cors";

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

  if (req.method === "POST") {
    return createEvent(req, res, next);
  }
}
