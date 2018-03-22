import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';


import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ProfileComponent, SettingsComponent, MyArticlesComponent, EditArticleComponent, CreateArticleComponent],
  exports: [ProfileComponent, SettingsComponent, MyArticlesComponent, EditArticleComponent, CreateArticleComponent]
})
export class UsersModule { }
