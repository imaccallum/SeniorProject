import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArticleComponent, SafeHtmlPipe],
  exports: [ArticleComponent, SafeHtmlPipe]
})
export class SharedModule { }
