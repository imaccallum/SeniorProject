import { Component, OnInit } from '@angular/core';

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

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.userObservable.subscribe(user => {
        this.user = user
    })
  }

  logout() {
    this.userService.logout()
  }
}