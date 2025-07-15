import { Component, OnInit } from '@angular/core';
import { WhoAreWe } from '../../components/who-are-we/who-are-we';
import { Unique } from '../../components/unique/unique';
import { ChooseUs } from '../../components/choose-us/choose-us';
import { Discount } from '../../components/discount/discount';
import { IArticle } from '../../models/product-model';
import { ArticlesService } from '../../services/articles-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [WhoAreWe, Unique, ChooseUs, Discount, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  articles: IArticle[] = [];

  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((res: any) => {
      this.articles = res;
      console.log('articles ::', res);
    });
  }
}
