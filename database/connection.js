const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connection to MongoDB' + connect.connection.host);
    } catch (error) {
        console.log('DB Connection failed');
        process.exit(1);
    }
}

module.exports = dbConnect;