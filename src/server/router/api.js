import express from 'express'

import auth from '../controllers/auth.controller'
import articles from '../controllers/article.controller'


const { requiresRegistration, requiresLogin, requiresBearer, token, renderUrl, me } = auth

const router = express.Router();

router.post('/auth/signup', requiresRegistration, token);
router.post('/auth/login', requiresLogin, token);
router.get('/auth/me', requiresBearer, me);


router.post('/articles/preview', articles.createPreview);
router.post('/articles', requiresBearer, articles.create)

router.get('/articles/me', requiresBearer, articles.myArticles)
router.get('/articles', articles.list)

router.put('/articles/:articleId', requiresBearer, articles.requiresArticleAuthor, articles.update)

router.get('/articles/:articleId/me', requiresBearer, articles.requiresArticleAuthor, articles.get)
router.get('/articles/:articleId', articles.get)

router.use((req, res, next) => {
  console.log('CATCHALL')
  const err = new Error('Not found')
  err.code = 404

  next(err)
})


router.use((err, req, res, next) => {

  console.log('FORMATTING ERROR')

    console.log(err)

    console.log(err.message)

   const error = {
   	code: err.code || 400,
   	message: err.message
   }

  res.status(error.code).json(error)
})



module.exports = router