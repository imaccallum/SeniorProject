import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
	ProfileComponent,
	SettingsComponent,
	EditArticleComponent,
	CreateArticleComponent } from './modules/users/components';

import { 
	ListArticlesComponent, 
	ViewArticleComponent } from './modules/articles/components'


import { ArticleResolver, ArticleListResolver, MyArticleListResolver } from '@resolvers/index'

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
			{ 
				path: 'recent',
				pathMatch: 'full',
				component: ListArticlesComponent,
				runGuardsAndResolvers: 'always',
				resolve: {
					articleList: ArticleListResolver
				}
			},
			{ 
				path: ':articleId', 
				component: ViewArticleComponent,
				resolve: { article: ArticleResolver }
			},
			{ 
				path: '',
				pathMatch: 'full',
				component: ListArticlesComponent,
				runGuardsAndResolvers: 'always',
				resolve: {
					articleList: ArticleListResolver
				}
			},
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
			{ path: 'articles', component: ListArticlesComponent, resolve: { articleList: MyArticleListResolver } }
		]
	 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
