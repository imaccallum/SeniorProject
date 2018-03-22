import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Article } from '@models/index'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }

}
