import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Article } from '@models/index'
import { UserService } from '@services/index'

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit {
	
	articles: Article[] = []

  constructor(
  	private router: Router,
  	private userService: UserService) { }

  ngOnInit() {
  	this.updateArticles()
  }

  updateArticles() {
  	this.userService.getMyArticles().subscribe(articles => {
  		this.articles = articles
  	})
  }

	onArticleClick(article: Article) {
		console.log('CLICK ARTICLE')
		console.log(article)
		this.router.navigate(['articles', article.id])
	}


}
