import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TestimonialService {
  private testimonialsUrl = "http://localhost:3000/floralTestimonials/";

  constructor(private http: HttpClient) {}

  getAllTestimonials() {
    return this.http.get(this.testimonialsUrl);
  }
}
