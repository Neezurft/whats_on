# Whats on - A simple webapp to showcase upcoming events (powered by the Smarkets API)

##### Credits:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for the front-end and [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack/tree/master/examples/typescript) for the back-end.

## How to run locally:

- run `npm install` on the `back_end/` folder to install dependencies.
- run `npm start` to start the api proxy on the port 4000.

- run `npm install` on the `front_end/` folder to install dependencies.
- run `npm start` to start the React development server in the port 3000.

## How to deploy:

Note: AWS credentials must be set up in advace, if in doubt, go to this [link](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

### Initial deployment:

- run `npm run deploy` on the `back_end/` folder - take note of the endpoint in the result (something like `https://kjdhshjkds7681.execute-api.eu-west-2.amazonaws.com/staging`).

- edit config.json file in `front_end/src` and replace the "add-me-before-deployment" with the enpoint obtained in the last point.

- run `npm run deploy` on the `front_end/` folder. Take note of the `StaticSiteS3BucketWebsiteURL` result after running this command, that is the link to the webapp!

### Further deployments:

- run `npm run deploy` on the `back_end/` folder to deploy changes to the api.
- run `npm run deploy` on the `front_end/` folder to deploy changes to the webapp (no changes to the config.json file are needed).

## Reverting deployment and freeing resources:

- run `npm run remove` on the `back_end/` folder to remove the api.
- run `npm run remove` on the `front_end/` folder to remove the webapp.

Thanks for reading!
