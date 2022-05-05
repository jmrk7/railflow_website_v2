"use strict";

import ApiError from "../errors/api";
import { machineId } from "node-machine-id";
import cryptolens from "cryptolens";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import axios from "axios";
import querystring from "querystring";

import logger from "../config/logger";

const key = cryptolens.Key;
const Helpers = cryptolens.Helpers;
const uuidv4 = v4;

const spacesEndpoint = new AWS.Endpoint(process.env.SPACE_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

async function uploadLicence(data) {
  try {
    const TOKEN = process.env.CRYPTOLENS_LICENSE_EXTENSION_KEY;
    const RSA_PUB_KEY = process.env.CRYPTOLENS_RSA_PUB_KEY;

    const PRODUCT_ID = 8245;
    const code = await machineId();

    const filename = `licences/${uuidv4()}/railflow_license.skm`;

    const fileFullPath = `${process.env.SPACE_NAME}.${process.env.SPACE_ENDPOINT}/${filename}`;

    let licenseKey;

    try {
      licenseKey = await key.Activate(
        TOKEN,
        RSA_PUB_KEY,
        PRODUCT_ID,
        data.key,
        code
      );
    } catch (err) {
      logger.error("error when calling key activate: ", err);
    }

    const params = {
      Bucket: process.env.SPACE_NAME,
      Key: filename,
      Body: Helpers.SaveAsString(licenseKey),
      ACL: "public-read",
    };
    await s3.putObject(params, function (err, data) {
      if (err) {
        logger.error("error when uploading file to digital ocean", err);
      }
    });
    return { url: fileFullPath };
  } catch (error) {
    logger.error("Error When trying to upload file to Digital Ocean", error);
    throw new ApiError(`Error while uploading license; ${error}`);
  }
}

module.exports = { uploadLicence };
