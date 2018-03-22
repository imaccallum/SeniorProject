import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule { }
