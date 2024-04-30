<!-- code snippet -->

# Mongoose Pagination Simpler (Aggregate also)

const mongoose = require('mongoose');
const { mongoosePlugin, mongooseAggregatePlugin, getAggregatedPaginatedData, getPaginatedData } = require('mongoose-pagination');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/db_dono').then(() => console.log('Connected to MongoDB')).catch((err) => console.log('Failed to connect to MongoDB', err));

// any key value allowed
const UserSchema = new mongoose.Schema({}, { strict: false });

UserSchema.plugin(mongoosePlugin);
UserSchema.plugin(mongooseAggregatePlugin);

const UserModel = mongoose.model('User', UserSchema);


app.use((req, res, next) => {
    console.log('req.originalUrl >>>', req.originalUrl);
    next();
});

app.get('/', async (req, res) => {
    const query = [];
    const data = await getAggregatedPaginatedData({ model: UserModel, query });
    res.send(data);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});