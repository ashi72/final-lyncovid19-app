const mongoose = require('mongoose');

const URI = 'mongodb+srv://peterjwlee:mKmKmK@123@cluster0.swarx.mongodb.net/covid19LynbrookApp?retryWrites=true&w=majority';

const connectDB = async() => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('MongoDB was connected')
}

module.exports = connectDB;
