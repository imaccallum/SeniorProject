import { Component, OnInit } from '@angular/core';

import { UserService } from '@services/index'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: UserService) {

  }

  ngOnInit() {
  	this.userService.fetchUser()
  }
}
