import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewArticleComponent } from './components/view-article/view-article.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';

import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ViewArticleComponent, ListArticlesComponent],
  exports: [ViewArticleComponent, ListArticlesComponent]
})
export class ArticlesModule { }
