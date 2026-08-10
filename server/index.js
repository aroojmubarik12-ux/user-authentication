require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./db/connect');
const authRouter = require("./routes/user");
const cors = require('cors');

connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use('/', authRouter);

app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: "API Working" });
    console.log("App is up and running ");
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

// Add this line at the bottom for Vercel
module.exports = app;