import mongoose from 'mongoose';
import dbConfig from '@config/db';

const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

switch (process.env.DB_DRIVER) {
  case 'localhost':
    mongoose.connect(dbConfig.uri.localhost, mongooseConnectionOptions);

    break;

  case 'atlas':
    mongoose.connect(dbConfig.uri.atlas, mongooseConnectionOptions);

    break;

  default:
    mongoose.connect(dbConfig.uri.localhost, mongooseConnectionOptions);

    break;
}
