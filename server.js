const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const stripe = require('stripe')('sk_test_51IXTCgSBer6yUtA8SRL72euCzb8EjTBv9vjqm6Kw3FlR0hvbULZMBMpSglg6bnENDTwbycsW2oU6Xog46JDhAa8S00PW3RxM4p');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const hostelRoutes = require('./routes/hostel');
const auth = require('./routes/auth');
const stripeRoutes = require('./routes/stripe');

const dbURI = 'mongodb://localhost/pg-app';
// const dbURI = process.env.MONGODB_URI;

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
app.use('/api', stripeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));