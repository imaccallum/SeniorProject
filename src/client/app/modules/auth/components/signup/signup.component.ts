
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { PasswordValidator, DateValidator } from '@utils/validator/index'
import { AuthService, UserService } from '@services/index'
import { UserBuilder } from '@models/index'

import * as moment from 'moment';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  genders = ['male', 'female', 'other']
  
  minDate = {year: 1900, month: 1, day: 1};
  maxDate = moment().toObject()
  startDate = moment().toObject()

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router) {}

  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  username: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,32}/
  emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  ngOnInit(): void {

    this.firstName = new FormControl('', [Validators.required, Validators.minLength(1)])
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(1)])
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
    this.username = new FormControl('', [Validators.required, Validators.minLength(1)])
    this.password = new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])
    this.passwordConfirmation = new FormControl('')

    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation
    })

    this.passwordConfirmation.setValidators([Validators.required, PasswordValidator.matchPassword])

  }

  onSubmit() {
    var values = this.form.value;

    var payload: UserBuilder = {
      firstName: <any>values.firstName,
      lastName: <any>values.lastName,
      email: <any>values.email,
      username: <any>values.username,
      password: <any>values.password,
      passwordConfirmation: <any>values.passwordConfirmation
    }

    this.userService.signup(payload).subscribe(data => {
      this.router.navigate(['/']);
    })
  }
}