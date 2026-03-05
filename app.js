const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

const migrationRoutes = require('./routes/migration.routes');
app.use(express.json());

app.use('/api/migrate',migrationRoutes);


app.get('/',(req,res) => {
    res.send("Home page");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})