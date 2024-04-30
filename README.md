# Mongoose Pagination Simpler (Aggregate also)

```javascript
const mongoose = require('mongoose');
const { mongoosePlugin, mongooseAggregatePlugin, getAggregatedPaginatedData, getPaginatedData } = require('mongoose-pagination-v2');

const express = require('express');
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

// any key value allowed
const UserSchema = new mongoose.Schema({}, { strict: false });

UserSchema.plugin(mongoosePlugin);
UserSchema.plugin(mongooseAggregatePlugin);

const UserModel = mongoose.model('User', UserSchema);

app.get('/', async (req, res) => {
    const data = await getAggregatedPaginatedData({ model: UserModel, query: [] });
    res.send(data);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
