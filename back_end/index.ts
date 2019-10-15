import "source-map-support/register";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import serverless from "serverless-http";
import fetch from "node-fetch";
import config from "./config.json";

const app = express();
const { "endpoint-prefix": prefix, "api-base-url": apiBaseUrl } = config;

app.use(bodyParser.json());
app.use(cors());

app.get(`/${prefix}`, async (req, res) => {
  const { type } = req.query;

  const response = await fetch(apiBaseUrl + `?state=upcoming&type=${type}`).then(res => res.json());

  return res.json(response.events || []);
});

app.get(`/${prefix}/search`, (req, res) => {
  const { term } = req.query;

  return res.json({
    message: `To be implemented... You used the term: ${term} though`
  });
});

export const handler = serverless(app);
