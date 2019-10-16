import "source-map-support/register";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import serverless from "serverless-http";
import fetch from "node-fetch";
import config from "./config.json";
import serialiseResponse from "./src/serialisers/apiResponse";

const app = express();
const { "endpoint-prefix": prefix, "api-base-url": apiBaseUrl } = config;

app.use(bodyParser.json());
app.use(cors());

app.get(`/${prefix}`, async (req, res) => {
  let query = "?";

  for (const queryParamKey in req.query) {
    query += `${queryParamKey}=${req.query[queryParamKey]}&`;
  }

  try {
    const response = await fetch(apiBaseUrl + query).then(res => res.json());
    return res.json(serialiseResponse(response));
  } catch (_e) {
    // todo: improve - this is a very basic implementation, could be improved.
    return res.status(500).send();
  }
});

export const handler = serverless(app);
