import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '@services/index';
import { ArticleList } from '@models/index'

@Injectable()
export class ArticleListResolver implements Resolve<ArticleList> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
  	console.log('Fetching articles')
  	const page = route.paramMap.get('page') || 1
  	const search = route.paramMap.get('search') || null
  	console.log(page)
  	console.log(search)
    return this.userService.fetchArticles(<any>page, search)
  }
}