const express = require("express")
const router = express.Router()
const lighthouse = require("lighthouse")
const chromeLauncher = require("chrome-launcher")

// As soon as the client hit the /scan/ endpoint, the function below will run
// Sending back the JSON payload of Lighthouse audit results for "Audit" category
router.post("/", async (req, res, next) => {
  try {
    // Programatically running the Lighthouse audit process on the backend
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] })
    const options = {
      logLevel: "info",
      output: "json",
      port: chrome.port,
    }
    // The `req.body.url` will be the URL to be audited and comes from the client as parameter.
    // Example: "https://web.dev"
    const runnerResult = await lighthouse(req.body.url, options)

    // Sample logging for the Performance Report
    console.log("Report is done for", runnerResult.lhr.finalUrl)
    console.log(
      "Performance score was",
      runnerResult.lhr.categories.performance.score * 100
    )

    // Killing the Chrome launcher on the server as soon as the audit completes
    await chrome.kill()

    let networkRequests = runnerResult.lhr.audits
    // Send back the `networkRequests` object to the client
    // This contains the needed JSON data for the greenhouse computation
    // This returned JSON should be stored on the app's state
    res.send(networkRequests)
  } catch (err) {
    next(err)
    console.error("APPLICATION ERROR: ", err)
  }
})

module.exports = router
