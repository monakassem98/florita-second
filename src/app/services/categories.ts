import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Categories {

  private categoryUrl = 'http://localhost:3000/floralCategory/';

  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get(this.categoryUrl);
  }
}
