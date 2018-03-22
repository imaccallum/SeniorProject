'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  config = require('../config'),
  chalk = require('chalk');

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  subtitle: {
    type: String,
    default: '',
    trim: true,
    required: 'SubTitle cannot be blank'
  },
  bannerURL: {
    type: String,
    default: '',
    trim: true
  },
  contentUrl: {
    type: String,
    default: '',
    trim: true,
    required: 'Content URL cannot be blank'
  },
  contentRaw: {
    type: String,
    default: '',
    trim: true
  },
  contentHtml: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

// Duplicate the ID field.
ArticleSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ArticleSchema.set('toJSON', {
    virtuals: true
});

ArticleSchema.set('toObject', {
    virtuals: true
});

ArticleSchema.statics.seed = seed;


/**
* Seeds the User collection with document (Article)
* and provided options.
*/
function seed(doc, options) {
  var Article = mongoose.model('Article');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findUserUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findUserUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['User'] }
          })
          .exec(function (err, user) {
            if (err) {
              return reject(err);
            }

            doc.user = user;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Article
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Article (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Article\t' + doc.title + ' skipped')
          });
        }

        var article = new Article(doc);

        article.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Article\t' + article.title + ' added'
          });
        });
      });
    }
  });
}



const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article

