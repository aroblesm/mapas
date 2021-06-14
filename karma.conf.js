// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const redisPort = 6379
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

app.get("/states", (req, res) => {
  const searchTerm = req.query.search;
  try {
      client.get(searchTerm, async (err, states) => {
          if (err) throw err;
  
          if (states) {
              res.status(200).send({
                states: JSON.parse(states),
                  message: "data retrieved from the cache"
              });
          }
          else {
            states = await axios.get(`https://corona.lmao.ninja/v2/states?search=${searchTerm}`);
              client.setex(searchTerm, 600, JSON.stringify(states.data));
              res.status(200).send({
                states: states.data,
                  message: "cache miss"
              });
          }
      });
  } catch(err) {
      res.status(500).send({message: err.message});
  }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started");
});

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-leaflet-example'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
