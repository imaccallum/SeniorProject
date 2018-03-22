import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
	ProfileComponent,
	SettingsComponent,
	MyArticlesComponent,
	EditArticleComponent,
	CreateArticleComponent } from './modules/users/components';

import { 
	ListArticlesComponent, 
	ViewArticleComponent } from './modules/articles/components'


import { ArticleResolver } from '@resolvers/index'

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ 
		path: 'home',
		loadChildren: './modules/home/home.module#HomeModule'
	},
	{ 
		path: 'auth',
		loadChildren: './modules/auth/auth.module#AuthModule'
	},
	{ 
		path: 'articles',
		children: [
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{ path: 'list', component: ListArticlesComponent },
			{ 
				path: ':articleId', 
				component: ViewArticleComponent,
				resolve: { article: ArticleResolver }
			}
		]
	 },
	 { 
		path: 'users',
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'articles/create', component: CreateArticleComponent },
			{ path: 'articles/:articleId', component: EditArticleComponent },
			{ path: 'articles', component: MyArticlesComponent }
		]
	 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
