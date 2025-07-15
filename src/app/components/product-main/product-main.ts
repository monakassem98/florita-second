import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-main',
  imports: [RouterLink],
  templateUrl: './product-main.html',
  styleUrl: './product-main.css',
})
export class ProductMain {
  @Input() nameAction = '';
  @Input() titleAction = '';
}
