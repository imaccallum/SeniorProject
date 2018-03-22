import axios from 'axios'
import showdown from 'showdown'
import marked from 'marked'
import hljs from 'highlight.js'


marked.setOptions({
  highlight: function(code, lang) {
    if (typeof lang === 'undefined') {
      return hljs.highlightAuto(code).value;
    } else if (lang === 'nohighlight') {
      return code;
    } else {
      return hljs.highlight(lang, code).value;
    }
  }
});


const { Article } = require('../models')

const converter = new showdown.Converter()
converter.setFlavor('github');

exports.create = async function (body, user)  {

	var article = new Article(body);
	article.user = user;

	await article.save()

	return article
}

exports.get = async function (articleId) {

	const article = await Article
	.findById(articleId)
	.populate('User', 'displayName')
	
	return article
}

exports.getForUser = async function (user) {

	const articles = await Article.find({
		user: user
	})
	.sort('-created')
	.populate('User', 'displayName')
	.exec()

	return articles
};


exports.update = async function (article, body) {

	article.title = body.title;
	article.content = body.content;

	await article.save()

	return article
};


exports.delete = async function (article) {
	var article = req.article;

	await article.remove()

	return article
};


exports.list = async function () {
	const articles = await Article.find()
	.sort('-created')
	.populate('User', 'displayName')
	.exec()

	return articles
};


exports.createPreview = async function ({ title, subtitle, url }) {

	if (!url) {
		throw new Error('Must have a url')
	}

	const res = await axios.get(url)

	const markdown = res.data

	if (!markdown) {
		throw new Error('No markdown found')
	}

	const html = marked(markdown);

	if (!html) {
		throw new Error('Failed to render markdown')
	}

	const article = {
		id: null,
		title: title,
		subtitle: subtitle,
		contentUrl: url,
		contentRaw: markdown,
		contentHtml: html
	}

	return article
}



