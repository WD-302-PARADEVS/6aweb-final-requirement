const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();


app.use(express.json());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://paldengcarl:123@cluster0.bekua.mongodb.net/contactDB?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB connected');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});


const sheltersRoute = require('./routes/shelters');
const contactRoute = require('./routes/contact');

app.use('/api/shelters', sheltersRoute);
app.use('/api/contact', contactRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
