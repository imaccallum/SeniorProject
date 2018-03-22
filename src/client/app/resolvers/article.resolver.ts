import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '@services/index';
import { Article } from '@models/index'

@Injectable()
export class ArticleResolver implements Resolve<Article> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
  	const articleId = route.paramMap.get('articleId')
    return this.userService.getArticle(articleId)
  }
}