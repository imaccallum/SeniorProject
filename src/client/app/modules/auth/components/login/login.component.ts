import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService, UserService } from '@services/index'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
  	private auth: AuthService,
  	private userService: UserService,
  	private router: Router) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const { username, password } = values
    this.userService.login(username, password).subscribe(data => {
      this.router.navigate(['/']);
    })
  }
}
