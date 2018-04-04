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
	article.user = user._id;

	await article.save()

	return article
}

exports.get = async function (articleId) {

	const article = await Article
	.findById(articleId)
	.populate('user', 'displayName')
	.exec()

	console.log('ARTICLE')
	console.log(article)
	
	return article
}

exports.getForUser = async function (user) {

	const articles = await Article.find({
		user: user
	})
	.sort('-created')
	.populate('user', 'displayName')
	.exec()

	const result = {
		articles: articles,
		articleCount: articles.count,
		page: 1,
		pageSize: articles.count,
		pageCount: 1,
	}

	return result
};


exports.update = async function (id, body) {

	const article = await Article.findOneAndUpdate({ _id: id }, body, { upsert: true })

	return article
};

exports.create = async function (body, user)  {

	var article = new Article(body);
	article.user = user._id;

	await article.save()

	return article
}



exports.delete = async function (article) {
	var article = req.article;

	await article.remove()

	return article
};


exports.list = async function (currentPage = 1, currentPageSize = 5, currentSearch = null) {

	const query = currentSearch ? { $text: { $search: currentSearch, $caseSensitive: true } } : {}
	// const query = {}
	console.log('SEARCHHHHH')
	console.log(query)
	console.log(currentPage)
	console.log(currentPageSize)
	console.log(currentSearch)


	var options = {
	    // select:   'title date author',
	    // sort:  { date: -1 },
	    populate: ['user', 'displayName'],
	    lean: true,
	    // page: currentPage, 
	    // limit: currentPageSize
	};


	if (currentSearch) {


		// const { docs, total, limit, page, pages } = await Article.paginate(query, options)

		// const result = {
		// 	articles: docs,
		// 	articleCount: total,
		// 	page: page,
		// 	pageSize: limit,
		// 	pageCount: pages,
		// 	search: currentSearch
		// }


		const articles = await Article.find(query, {score: {$meta: "textScore"}})
		.select({score:{$meta:"textScore"}})
		.sort({score:{$meta:"textScore"}})
		.populate(options.populate)
		// .sort('-Created')
		// 
		
		articles.forEach(article => {
			console.log(article)

		})

		const result = {
			articles: articles,
			articleCount: articles.count,
			page: 1,
			pageSize: articles.count,
			pageCount: 1,
			search: currentSearch
		}

		return result

	} else {

		const articles = await Article.find()
		.sort('-created')
		.populate(options.populate)

		const result = {
			articles: articles,
			articleCount: articles.count,
			page: 1,
			pageSize: articles.count,
			pageCount: 1,
			search: currentSearch
		}

		return result

	}
};


exports.createPreview = async function ({ title, subtitle, url, tags }) {

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
		tags: tags,
		contentUrl: url,
		contentRaw: markdown,
		contentHtml: html
	}

	return article
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};




