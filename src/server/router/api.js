import express from 'express'

import auth from '../controllers/auth.controller'
import articles from '../controllers/article.controller'


const { requiresRegistration, requiresLogin, requiresBearer, token, renderUrl, me } = auth

const router = express.Router();

router.route('/auth/signup').post(requiresRegistration, token);
router.route('/auth/login').post(requiresLogin, token);
router.route('/auth/me').get(requiresBearer, me);


router.post('/articles/preview', articles.createPreview);
router.post('/articles', requiresBearer, articles.create)

router.get('/articles/me', requiresBearer, articles.myArticles)
router.get('/articles', articles.list)

router.put('/articles/:articleId', requiresBearer, articles.requiresArticleAuthor, articles.update)

router.get('/articles/:articleId/me', requiresBearer, articles.requiresArticleAuthor, articles.get)
router.get('/articles/:articleId', articles.get)


// router.get('/articles/:articleId/tags', articles.listTagsForArticle)
// router.post('/articles/:articleId/tags/:tagId', articles.requiresArticleAuthor, articles.addTagToArticle)
// router.del('/articles/:articleId/tags/:tagId', articles.requiresArticleAuthor, articles.removeTagFromArticle)

// // MARK: Articles

// // Articles collection routes
// router.route('/api/articles')
// 	.all(articlesPolicy.isAllowed) 
//   .get(articles.list)
//   .post(articles.create);

// router.route('/api/articles/me')
// 	.all(articlesPolicy.isAllowed)
// 	.get(articles.myArticles)

// router.route('/api/articles/md')
// 	.all(articlesPolicy.isAllowed)
//   .post(articles.pullMarkdownFromUrl)

// // Single article routes
// router.route('/api/articles/:articleId')
// 	.all(articlesPolicy.isAllowed)
//   .get(articles.read)
//   .put(articles.update)
//   .delete(articles.delete);

// // Finish by binding the article middleware
// router.param('articleId', articles.articleByID);


module.exports = router