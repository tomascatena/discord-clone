import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const getMongoInstance = async () => {
  const mongo = await MongoMemoryServer.create();

  return mongo;
};

// Connect to the database
const connect = async () => {
  const mongo = await getMongoInstance();

  const uri = mongo.getUri();

  await mongoose.connect(uri);
};

// Disconnect from the database and close the connection
const closeDatabase = async () => {
  const mongo = await getMongoInstance();

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  await mongo.stop();
};

// Clear the database, remove all data
const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  Object.keys(collections).forEach(async (collectionName) => {
    const collection = collections[collectionName];
    await collection.deleteMany({});
  });
};

export default {
  connect,
  closeDatabase,
  clearDatabase,
};
