import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, UserService } from '@services/index'
import { User } from '@models/index'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarCollapsed = true;
  components = [];
  user?: User;
  brand = 'Senior Project'

  isLoggedIn: boolean = false

  constructor(
    private userService: UserService, 
    private router: Router) { }

  ngOnInit() {

    this.userService.userObservable.subscribe(user => {
        this.user = user
    })
  }

  logout() {
    this.userService.logout()
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const { search } = values

    console.log(search)

    this.router.navigate(['/', 'articles', {
      search: search
    }])
  }



}