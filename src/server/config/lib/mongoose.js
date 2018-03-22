'use strict';

import config from '../'
import chalk from 'chalk'
import mongoose from 'mongoose'

exports.connect = async function () {

  try {
    // Load the mongoose models
    const models = require('../../models')

    // Connect to mongo
    const connection = await mongoose.connect(config.db.uri, config.db.options)

    mongoose.set('debug', config.db.debug);

    return connection.db

  } catch (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
      throw err
  }
}

exports.disconnect = async function (cb) {

  try {

    await mongoose.connection.db.close()
    console.info(chalk.yellow('Disconnected from MongoDB.'));
    return

  } catch (err) {
      console.error(chalk.red('Failed to disconnect from MongoDB!'));
      console.log(err);
      throw err
  }
};


