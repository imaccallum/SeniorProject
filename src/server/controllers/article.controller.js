'use strict';

import { articleRepo } from '../repo'


// MARK: Middleware

exports.requiresArticleAuthor = async function (req, res, next) {

  try {

    const { articleId } = req.params

    if (!articleId) {
      throw new Error('Must provide an article id')
    }

    const article = await articleRepo.get(articleId)

    const user = req.user

    if (!user) {
      throw new Error('Must provide a user')
    }

    if (article.user.id !== user.id) {
      throw new Error('Must be the author to edit an article')
    }

    next()

  } catch (err) {
    next(err)
  }
}



// MARK: Controller


exports.create = async function (req, res, next) {
  try {

    const { user, body } = req

    if (!user) {
      throw new Error('User required')
    }

    const { title, subtitle, url, tags } = body

    const articleBody = await articleRepo.createPreview({
      title: title,
      subtitle: subtitle,
      url: url,
      tags: tags
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

  console.log('ARTICLE PREVIEW')

  try {

    const { title, subtitle, url, tags } = req.body

    const article = await articleRepo.createPreview({
      title: title,
      subtitle: subtitle,
      url: url,
      tags: tags
    })

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
exports.update = async function (req, res, next) {

  console.log('UPDATING ARTICLE')

    try {

    const { body, params } = req
    const { title, subtitle, url, tags } = body
    const { articleId } = params

    const articleBody = await articleRepo.createPreview({
      title: title,
      subtitle: subtitle,
      url: url,
      tags: tags
    })

    const article = await articleRepo.update(articleId, articleBody)

    res.json(article)

  } catch (err) {
    console.log(err)
    next(err)
  }

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

    const { query } = req
    const { page, search } = query
    console.log(query)
    const result = await articleRepo.list(page, 5, search)

    res.json(result)
  } catch (err) {
    next(err)
  }


}

exports.myArticles = async function (req, res, next) {

  try {

    const { user } = req

    const result = await articleRepo.getForUser(user)

    res.json(result)

  } catch (err) {
    next(err)
  }


};
