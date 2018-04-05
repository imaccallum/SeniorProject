import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { Article } from '@models/index'
import { UserService, AlertService } from '@services/index'
import { PasswordValidator, DateValidator } from '@utils/validator/index'


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

	article?: Article
	preview?: Article

	form: FormGroup;
  title: FormControl;
  subtitle: FormControl;
  url: FormControl;
  tags: FormControl;

  urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/


  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private userService: UserService,
  	private alertService: AlertService
  	) {}

  ngOnInit() {
  	this.article = this.route.snapshot.data['article'];
  	this.preview = this.article

    this.title = new FormControl(this.article.title, [Validators.required, Validators.minLength(1)])
    this.subtitle = new FormControl(this.article.subtitle, [Validators.required, Validators.minLength(1)])
    this.url = new FormControl(this.article.contentUrl, [Validators.required, Validators.pattern(this.urlPattern)])
    this.tags = new FormControl(this.article.tags, [])

    this.form = new FormGroup({
      title: this.title,
      subtitle: this.subtitle,
      url: this.url,
      tags: this.tags,
    })

  }


   onSubmit() {
    var values = this.form.value;
    
    const { title, subtitle, url, tags } = values

    this.userService.updateArticle(this.article.id, title, subtitle, url, tags)
    .subscribe(data => this.handleUpdatedArticle(data))

  }

  handleUpdatedArticle(article) {
    this.router.navigate(['articles', article.id])
    this.alertService.success('Success!', 'Updated article!')
  }


  onAdding(tag): Observable<string> {
  	console.log(tag)
    return Observable.of(tag)
}

  previewArticle() {

    console.log('PREVIEW ARTICLE')
    var values = this.form.value;
    
    const { title, subtitle, url, tags } = values

    this.userService.previewArticle(title, subtitle, url, tags).subscribe(
      data => this.handleArticlePreview(data))
  }

  handleArticlePreview(article: Article) {
  	this.preview = article
  }
}