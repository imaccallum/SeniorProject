import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService, UserService } from '@services/index'
import { UserBuilder } from '@models/index'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
  	private auth: AuthService,
  	private userService: UserService,
  	private router: Router) { }

  ngOnInit() {
  	if (this.auth.isLoggedIn()) {
  		this.router.navigate(['/settings']);
  	}
  }

  onSubmit(form: NgForm) {
    var values = form.value;

    var payload: UserBuilder = {
    	firstName: <any>values.firstName,
    	lastName: <any>values.lastName,
    	email: <any>values.email,
    	username: <any>values.username,
    	password: <any>values.password,
    	passwordConfirmation: <any>values.passwordConfirmation
    }

    this.userService.signup(payload)
  }
}