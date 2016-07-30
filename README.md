# Turo Code Challenge: Search for rental cars with the Hotwire API

## View the Demo

https://fpo-link-to-eb-site

## Get It Running

Clone the repo, and then:

```
npm install
npm start
```
App will be running locally in development mode on localhost:3000

## Ingredients

This is a ‘universal’ app, built with Node, Express, Webpack, React, React-Router, and Redux.

It’s deployed on Amazon Web Services Elastic Beanstalk.

Initial requests from the client trigger a server-side render of the view. HTML and CSS are sent to the client, along with the initial server-determined Redux state.

The browser renders the static page, and loads the Webpacked JavaScript bundle. React takes over, rehydrates the Redux store, and takes over user interaction and routing on the client. Additional requests for data are made asyncronously via Redux ‘thunk’ actions to separate routes on the server that return JSON only.
