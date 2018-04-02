'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  config = require('../config'),
  chalk = require('chalk');

  var mongoosePaginate = require('mongoose-paginate');
 


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
  },
  tags: {type: [String] }
});

ArticleSchema.index({title: 'text', 'subtitle': 'text', tags: 'text'}, { weights: {
  title: 3, tags: 2, subtitle: 1
}});
ArticleSchema.plugin(mongoosePaginate);


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



const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article

