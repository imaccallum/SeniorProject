import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Article } from '@models/index'
import { UserService } from '@services/index'

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {

	article?: Article

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private userService: UserService
  	) {}

  ngOnInit() {
  	this.article = this.route.snapshot.data['article'];
  }

}