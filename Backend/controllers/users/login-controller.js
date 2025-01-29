const signModel = require("../../dbModule/signModule");
const bcrypt = require("bcrypt");

// Get session data
exports.getLogin = async (req, res) => {
    try {        
        const sessionData = req.session.prakash;        
        console.log("Session Data:", sessionData);
        if (sessionData) {
            res.status(200).json({ message:true, data: sessionData });
        } else {
            res.status(404).json({ message: "No session data found" });
        }
    } catch (err) {
        console.error("Error retrieving session data:", err);
        res.status(500).json({ error: err.message });
    }
};

// Set session data
exports.checkLogin = async (req, res) => {
    try {        
        req.session.prakash = req.body;
        console.log("Session Data Stored:", req.session.prakash);
        res.status(200).json({ message: "Session data stored successfully", data: req.session.prakash });
    } catch (err) {
        console.error("Error storing session data:", err);
        res.status(500).json({ error: err.message });
    }
};
