const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const hostelRoutes = require('./routes/hostel');
const auth = require('./routes/auth');

// const dbURI = 'mongodb://localhost/pg-app';
const dbURI = 'mongodb+srv://amare:amare@mycluster.0e2la.gcp.mongodb.net/nest?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then((result) => console.log('Mongodb connected...'))
    .catch((err) => console.log(err));

app.use('/api', hostelRoutes);
app.use('/api', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));