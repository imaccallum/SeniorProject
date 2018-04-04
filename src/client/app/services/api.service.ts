import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { AlertService } from './alert.service'

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';


export interface HttpRequestOptions {
  additionalHeaders?: Object
}

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: Http, 
    private auth: AuthService, 
    private alert: AlertService) { }

  get<T>(url: string, options: any = {}): Observable<T> {
    return this.request<T>(url, RequestMethod.Get, null, options);
  }

  post<T>(url: string, body: Object = {}, options: any = {}): Observable<T> {
    return this.request<T>(url, RequestMethod.Post, body, options);
  }

  put<T>(url: string, body: Object = {}, options: any = {}): Observable<T> {
    return this.request<T>(url, RequestMethod.Put, body, options);
  }

  delete<T>(url: string, options: any = {}): Observable<T> {
    return this.request<T>(url, RequestMethod.Delete, null, options);
  }

  request<T>(url: string, method: RequestMethod, body?: Object, options?: any): Observable<T> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('REQUEST')
    console.log(options)


    if (options && options.additionalHeaders) {

      for (let key in options.additionalHeaders) {
        headers.append(key, options.additionalHeaders[key])
      }
    }



    if (!headers.has('Authorization')) {
      const token = this.auth.getToken()

      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }
    }

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers,
      params: options.params
    });

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => {
        console.log('RESPONSE')
        console.log(res)
        return res.json() as T
      })
      .catch(err => this.onRequestError(err))
  }

  onRequestError(err: Response) {
    console.log('CATCH ERROR')

    let body = err.json();
    let errorMessage = null;

    if (body) {
      errorMessage = body.message
    } else {

      console.log(err)
      errorMessage = `Server returned code: ${err.status}, error message is: ${err}`
    }

    if (errorMessage) {
      console.log(errorMessage)
      console.log(this.alert)
      this.alert.error('Error', errorMessage)
    }

    return Observable.throw(errorMessage);


    // console.log(err)


    // const error = err.error



    // return Observable.throw(errorMessage);
  }

}
