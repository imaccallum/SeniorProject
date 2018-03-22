import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



import { Article } from '@models/index'
import { UserService } from '@services/index'

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

	article?: Article


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

   onSubmit(form: NgForm) {
    const values = form.value;
    const { title, subtitle, url } = values

  	this.userService.renderArticlePreview(title, subtitle, url).subscribe(
  		data => this.handleArticlePreview(data),
  		err => this.handleError(err)
  	)
  }

  handleArticlePreview(article: Article) {
  	console.log(article)
  	this.article = article
  }

  handleError(err) {

  }

}
