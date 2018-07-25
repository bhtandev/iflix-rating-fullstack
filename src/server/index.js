const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const MongodbMemoryServer = require('mongodb-memory-server').default;

const seeder = require('./dev/seeder');
const apiV1 = require('./api/v1/routes');

let appState = 'init';

const mongod = new MongodbMemoryServer({
  instance: {
    port: 41934,
    dbName: 'iflix_db1',
  }
});

console.log('Starting up mongod service... (MongoMemoryServer)');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongod.getConnectionString().then((mongoUri) => {
  const mongooseOpts = { // options for mongoose 4.11.3 and above
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
  // useMongoClient: true, // remove this line if you use mongoose 5 and above
  };
  mongoose.connect(mongoUri, mongooseOpts).then(async () => {
    if (process.env.ENVIRONMENT !== 'test') {
      await seeder.seedTheData().catch((error) => {
        console.log('Error seeding!!!', error);
      });
      console.log('Seeding complete.');
    }
    appState = 'db ready';
    app.emit(appState);
  });

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

app.use(express.static('dist'));
app.use('/api/v1', apiV1);

app.on('db ready', () => {
  app.listen(8080, () => {
    console.log('Listening on port 8080!');

    appState = 'app started';
    app.emit(appState);
    console.log('Server ready!');
  });
});

app.get('/api/ready', (req, res) => {
  res.send({ state: appState });
});

module.exports = { app, mongod };
