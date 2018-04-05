import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { Article } from '@models/index'
import { UserService, AlertService } from '@services/index'
import { PasswordValidator, DateValidator } from '@utils/validator/index'


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

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

    this.title = new FormControl('', [Validators.required, Validators.minLength(1)])
    this.subtitle = new FormControl('', [Validators.required, Validators.minLength(1)])
    this.url = new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)])
    this.tags = new FormControl([], [])

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

    this.userService.createArticle(title, subtitle, url, tags)
    .subscribe(data => this.handleCreateArticle(data))

  }

  handleCreateArticle(article) {
    this.router.navigate(['articles', article.id])
    this.alertService.success('Success!', 'Created article!')
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