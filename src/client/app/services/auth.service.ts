import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Observable }   from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { distinctUntilChanged, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  storageKey: string = 'com.senior-project.auth.token';

  private tokenSubject = new BehaviorSubject<string>(null);
  public tokenObservable = this.tokenSubject.asObservable();

  constructor(private router: Router) { }

  ngOnInit() {
    const token = this.getToken()
    this.tokenSubject.next(token)
  }

  // MARK: Token
  
  setToken(token?: string) {
    console.log(`SAVING TOKEN: ${token}`)
    if (token) {
      localStorage.setItem(this.storageKey, token);
      this.tokenSubject.next(token)
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {

    localStorage.removeItem(this.storageKey);
    this.tokenSubject.next(null)
  }
}
