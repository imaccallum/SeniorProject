import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



import { Article } from '@models/index'
import { UserService, AlertService } from '@services/index'

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

	article?: Article

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
  }


  submitArticle(form: NgForm) {
    const values = form.value;

    const { title, subtitle, url, tags } = values

    const mappedTags = tags.map(tag => tag.value)

    this.userService.createArticle(title, subtitle, url, mappedTags)
    .subscribe(data => this.handleNewArticle(data))
  }

  handleNewArticle(article) {
    this.router.navigate(['articles', article.id])
    this.alertService.success('Success!', 'Created article!')
  }

  previewArticle(form: NgForm) {

    console.log('PREVIEW ARTICLE')
    const values = form.value;
    const { title, subtitle, url, tags } = values

    this.userService.previewArticle(title, subtitle, url, tags).subscribe(
      data => this.handleArticlePreview(data))
  }

  handleArticlePreview(article: Article) {
  	this.article = article
  }
}
