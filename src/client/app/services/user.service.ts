import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable }   from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { distinctUntilChanged, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service'
import { AuthService } from './auth.service'

import { User, UserBuilder, Article, ArticleList, Authentication } from '@models/index'


@Injectable()
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  public userObservable = this.userSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
  	private api: ApiService,
  	private auth: AuthService,
  	private router: Router) {}

  ngOnInit() {

    this.auth.tokenObservable.subscribe(
      data => this.fetchUser()
     )
  }




  fetchUser() {
    this.api.get<User>('auth/me').subscribe(next => {
        this.userSubject.next(next)
         
      }, err => {
        this.userSubject.next(null)
      })

  }


  getUser(): User {
    return this.userSubject.getValue()
  }

  login(username: string, password: string, redirect?: string) {
    
    const payload = { username, password } 
    const auth = btoa(`${username}:${password}`)
    const headers = { "Authorization": "Basic " + auth }
    const options = { additionalHeaders: headers }

    this.api.post<Authentication>('auth/login', payload, options)
      .subscribe(data => {
        this.auth.setToken(data.token);
        this.userSubject.next(data.user)
        this.router.navigate([redirect || '/home']);
      });
  }

  signup(payload: UserBuilder, redirect?: string) {

  	this.api.post<Authentication>('auth/signup', payload)
      .subscribe(data => {
        this.auth.setToken(data.token);
        this.userSubject.next(data.user)
        this.router.navigate([redirect || '/home']);
      });
  }

  logout() {
    this.userSubject.next(null)
    this.auth.logout()
  }

  createArticle(title: string, subtitle: string, url: string, tags: string[]): Observable<Article> {
    const payload = { title, subtitle, url, tags }
    return this.api.post<Article>('articles', payload)
  }
  
  previewArticle(title: string, subtitle: string, url: string, tags: string[]): Observable<Article> {
    const payload = { title, subtitle, url, tags }
    return this.api.post<Article>('articles/preview', payload)
  }




  fetchArticles(page: number = null, search: string = null): Observable<ArticleList> {
    console.log('searching for')
    console.log(page)
    console.log(search)

    const params: any = {}

    if (page) {
      params.page = page
    }

    if (search) {
      params.search = search
    }


  // fetchArticles(page: number, pageSize: number): Observable<Article[]> {
    return this.api.get<ArticleList>('articles', {
      params: params
    })
  }

  getArticle(articleId): Observable<Article> {
    return this.api.get<Article>(`articles/${articleId}`)
  }

  getMyArticles(): Observable<ArticleList> {
    return this.api.get<ArticleList>('articles/me')
  }
}
