import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router'

import { ApiService, AuthService, UserService, AlertService } from '@services/index';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AlertComponent } from './modules/alert/alert.component'

import { SharedModule } from './modules/shared/shared.module'
import { CoreModule } from './modules/core/core.module'
import { UsersModule } from './modules/users/users.module'
import { ArticlesModule } from './modules/articles/articles.module';

import { ArticleResolver } from './resolvers/article.resolver'
import { ArticleListResolver } from './resolvers/article.list.resolver'
import { MyArticleListResolver } from './resolvers/my.article.list.resolver'


import { TagInputModule } from 'ngx-chips';



TagInputModule.withDefaults({
    tagInput: {
        placeholder: 'Add new tag'
    }
});


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    TagInputModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    UsersModule,
    ArticlesModule
  ],
  providers: [AlertService, AuthService, ApiService, UserService,
    ArticleResolver, ArticleListResolver, MyArticleListResolver
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}