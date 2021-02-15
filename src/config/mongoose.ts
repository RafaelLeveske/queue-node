interface IDBConfig {
  uri: {
    atlas: string;
    localhost: string;
  };
}

export default {
  uri: {
    localhost: `mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE_NAME}`,
    atlas: `mongodb+srv://${process.env.MONGO_DB_ATLAS_USER}:${process.env.MONGO_DB_ATLAS_PASS}@${process.env.MONGO_DB_ATLAS_CLUSTER}.mongodb.net/${process.env.MONGO_DB_ATLAS_NAME}?retryWrites=true&w=majority`,
  },
} as IDBConfig;
