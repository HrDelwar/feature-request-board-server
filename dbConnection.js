import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vzza0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  // const uri = `mongodb://localhost:27017/bando-db`
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(uri.toString(), options)
    .then(() => console.log('DB Connected!'))
    .catch((e) => console.log(e));
};

export default dbConnection;
