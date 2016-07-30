# Turo Code Challenge: Search for rental cars with the Hotwire API

## View the Demo

https://hotwire-dev.us-west-1.elasticbeanstalk.com

## Get It Running Locally

This project expects a development environment running     Node 4.4.3 and NPM 2.15.1

Clone the repo, and then:

```
npm install
npm start
```
The app will be running locally in development mode on localhost:3000

Connect mobile devices to the app (as long as they’re on the same local wireless network as the dev machine) by pointing them to the local IP of the dev machine, port 3000.

When running in development mode, changes to React components and scss files will be pushed to clients via webpack-hot-middleware.

## Ingredients

This is a ‘universal’ app, built with Node, Express, Webpack, React, React-Router, and Redux.

It’s deployed on Amazon Web Services Elastic Beanstalk.

Initial requests from the client trigger a server-side render of the view. HTML and CSS are sent to the client, along with the initial server-determined Redux state and the Webpacked client-side JavaScript.

The browser renders the static page while loading the JS bundle. Once ready, React rehydrates the Redux store, and takes over user interaction and routing on the client. Additional requests for data are made asyncronously via Redux ‘thunk’ actions to separate routes on the server that return JSON only.

The overall structure of the project is based heavily on Jared Palmer's [React Production Starter](https://github.com/jaredpalmer/react-production-starter/tree/master). However, this app removes route-based code splitting (it’s overkill here), and adds a naive implementation of cache busting for Node's require tree when in development mode. This keeps server-side renders up to date with components that may have been changed by hot module replacement.
