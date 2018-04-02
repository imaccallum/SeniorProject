import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Article, ArticleList } from '@models/index'
import { UserService } from '@services/index'

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

	articleList?: ArticleList

  constructor(
  	private router: Router,
    private route: ActivatedRoute,
  	private userService: UserService) { }

  ngOnInit() {
    this.articleList = this.route.snapshot.data['articleList'];

    this.route.paramMap.subscribe(params => {
      console.log('PARAMS')
      console.log(params)

      const search = params.get('search')
      const page = <any>params.get('page')

      if (!search) {
        return
      }

      this.userService.fetchArticles(page, search).subscribe(result => {
          this.articleList = result
       })
    })

  }

	onArticleClick(article: Article) {
		console.log('CLICK ARTICLE')
		console.log(article)
		this.router.navigate(['/', 'articles', article.id])
	}

  onPageChange(page) {


    // console.log('ON PAGE CHANGE')
    // console.log(page)

    // if (page == this.articleList.page) {
    //   return
    // }

    // this.userService.fetchArticles(page, this.articleList.search).subscribe(result => {
    //   this.articleList = result
    // })
  }
}
