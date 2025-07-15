import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesUrl = 'http://localhost:3000/floralArticles/';

  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http.get(this.articlesUrl);
  }
}
