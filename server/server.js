const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');
 
 
const authRoutes = require('./routes/authRoutes');
const { protect, authorizeRoles } = require('./middleware/authMiddleware');


const pastEventRoutes = require('./routes/pastEventRoutes');
const upcomingEventRoutes = require('./routes/upcomingEventRoutes');
const governingTeamRoutes = require('./routes/governingTeamRoutes');
const getpastRouters=require('./routes/getpastRouters');
const getupcomming=require('./routes/getupcomming')
const electromazineRoutes = require('./routes/electromazineRoutes');
const elect=require('./routes/getelectrouter');
const gov=require('./routes/getgovroute')
const app = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
 

app.use('/api/past-events', pastEventRoutes); 
app.use('/api/upcoming-events', upcomingEventRoutes); 
app.use('/api/governing-team', governingTeamRoutes); 
app.use('/api/auth', authRoutes); 
 
 
app.use('/api/admin/past-events', protect, authorizeRoles('admin'), pastEventRoutes);
app.use('/api/admin/upcoming-events', protect, authorizeRoles('admin'), upcomingEventRoutes); 
app.use('/api/admin/governing-team', protect, authorizeRoles('admin'), governingTeamRoutes);

app.use('/api',getpastRouters)
app.use('/api',getupcomming) 
app.use('/api/electromazine', electromazineRoutes);
app.use('/api',elect)
app.use('/api',gov)
 
const ourTeamJourneyRoutes = require('./routes/ourTeamJourneyRoutes');
app.use('/api/our-team-journey', ourTeamJourneyRoutes);
 

db();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`); 
// });  

const serverless = require("serverless-http");
module.exports = app;
module.exports.handler = serverless(app);


app.get('/',(req,res)=>{
    res.send("IETE server is running")
})