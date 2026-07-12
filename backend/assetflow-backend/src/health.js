const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/test-ai", async (req, res) => {
    try {
        const response = await axios.get("http://127.0.0.1:8001/health");

        res.json({
            connected: true,
            ai: response.data
        });

    } catch (error) {
        res.status(500).json({
            connected: false,
            error: error.message
        });
    }
});

module.exports = router;