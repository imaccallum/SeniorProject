import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';


import { SharedModule } from '@shared/shared.module'

import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TagInputModule
  ],
  declarations: [ProfileComponent, SettingsComponent, EditArticleComponent, CreateArticleComponent],
  exports: [ProfileComponent, SettingsComponent, EditArticleComponent, CreateArticleComponent]
})
export class UsersModule { }
