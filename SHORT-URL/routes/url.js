const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

console.log("✅ url.js route file loaded");

router.post("/", handleGenerateNewShortURL); // call directly

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
