import express from 'express'

import auth from '../controllers/auth.controller'
import articles from '../controllers/article.controller'


const { requiresRegistration, requiresLogin, requiresBearer, token, renderUrl, me } = auth

const router = express.Router();

router.route('/auth/signup').post(requiresRegistration, token);
router.route('/auth/login').post(requiresLogin, token);
router.route('/auth/me').get(requiresBearer, me);


// auth.routes
// Setting up the users password api
// router.route('/auth/forgot').post(users.forgot);
// router.route('/auth/reset/:token').get(users.validateResetToken);
// router.route('/auth/reset/:token').post(users.reset);

// Setting up the users authentication api
// router.route('/auth/signout').get(users.signout);

// Setting the oauth routes
// router.route('/auth/:strategy').get(users.oauthCall);
// router.route('/auth/:strategy/callback').get(users.oauthCallback);


// user.routes


// router.route('/users')
//   .get(userPolicy.isAllowed, user.list);

// // Single user routes
// router.route('/users/:userId')
//   .get(userPolicy.isAllowed, user.read)
//   .put(userPolicy.isAllowed, user.update)
//   .delete(userPolicy.isAllowed, user.delete);

// // Finish by binding the user middleware
// router.param('userId', user.userByID);



// // users.routes
//   // Setting up the users profile api
// router.route('/users/me').get(users.me);
// router.route('/users').put(users.update);
// router.route('/users/accounts').delete(users.removeOAuthProvider);
// router.route('/users/password').post(users.changePassword);
// router.route('/users/picture').post(users.changeProfilePicture);

// // Finish by binding the user middleware
// router.param('userId', users.userByID);


router.post('/articles/preview', articles.createPreview);
router.post('/articles', requiresBearer, articles.create)

router.get('/articles', articles.list)
router.get('/articles/me', requiresBearer, articles.myArticles)

router.put('/articles/:articleId', requiresBearer, articles.requiresArticleAuthor, articles.update)

router.get('/articles/:articleId', articles.get)
router.get('/articles/:articleId/me', requiresBearer, articles.requiresArticleAuthor, articles.get)

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