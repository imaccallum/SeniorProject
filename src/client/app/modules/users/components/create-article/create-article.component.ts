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

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }


  submitArticle(form: NgForm) {
    const values = form.value;

    const { title, subtitle, url, tags } = values

    const mappedTags = tags.map(tag => tag.value)

    this.userService.createArticle(title, subtitle, url, mappedTags).subscribe(
      data => {
        this.router.navigate(['articles', data.id])
      },
      err => this.handleError(err)
    )
  }

  previewArticle(form: NgForm) {

    console.log('PREVIEW ARTICLE')
    const values = form.value;
    const { title, subtitle, url, tags } = values

    this.userService.previewArticle(title, subtitle, url, tags).subscribe(
      data => this.handleArticlePreview(data),
      err => this.handleError(err)
    )
  }

  handleArticlePreview(article: Article) {
  	this.article = article
  }

  handleError(err) {

  }

}
