'use strict';

import { articleRepo } from '../repo'


// MARK: Middleware

exports.requiresArticleAuthor = async function (req, res, next) {

  next()
}



// MARK: Controller


exports.create = async function (req, res, next) {
  try {

    const { user, body } = req

    if (!user) {
      throw new Error('User required')
    }

    const { title, subtitle, url } = body

    const articleBody = await articleRepo.createPreview({
      title: title,
      subtitle: subtitle,
      url: url
    })

    console.log('ARTICLE BODY')
    console.log(articleBody)

    const article = await articleRepo.create(articleBody, user)

    res.json(article)

  } catch (err) {
    next(err)
  }
};


exports.createPreview = async function (req, res, next) {

  try {

    const { title, url } = req.body

    const article = await articleRepo.createPreview(title, url)

    res.json(article)

  } catch (err) {
    next(err)
  }

}



exports.get = async function (req, res, next) {
  try {

    const { articleId } = req.params

    if (!articleId) {
      throw new Error('Missing parameter')
    }

    const article = await articleRepo.get(articleId)

    res.json(article)

  } catch (err) {
    next(err)
  }
};


/**
 * Update an article
 */
exports.update = function (req, res) {
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {

};

/**
 * List of Articles
 */
exports.list = async function (req, res, next) {
  try {

    const articles = await articleRepo.list()

    res.json(articles)
  } catch (err) {
    next(err)
  }


}

exports.myArticles = async function (req, res, next) {

  try {

    const { user } = req

    const articles = await articleRepo.getForUser(user)

    res.json(articles)

  } catch (err) {
    next(err)
  }


};
