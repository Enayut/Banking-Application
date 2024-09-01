const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const mongoose = require('mongoose'); 
const {MONGO_URI} = require('./config')

const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);
mongoose.connect(MONGO_URI);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
