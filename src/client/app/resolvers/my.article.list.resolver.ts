import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '@services/index';
import { ArticleList } from '@models/index'

@Injectable()
export class MyArticleListResolver implements Resolve<ArticleList> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getMyArticles()
  }
}