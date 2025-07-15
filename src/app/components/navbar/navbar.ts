import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/product-model';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private cartSubscription!: Subscription;

  isUserStatus: boolean = false;
  userName: string = '';
  navStatus: string = 'default';
  cartItems: number = 0;

  constructor(private route: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getUserData();
    this.userAuthReload();
    this.cartSubscription = this.cartService.cartData.subscribe(
      (count: number) => {
        this.cartItems = count;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getUserData() {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      console.log(userData);

      this.userName = userData[0].name;
      this.navStatus = 'user';
      console.log('userData ::', userData);
      console.log('userName ::', this.userName);
    }
  }

  toggleUserStatus() {
    this.isUserStatus = !this.isUserStatus;
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);

    this.cartService.updateCartNumber([]);
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/home']);
    }
  }

  numberOfItems() {
    let cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
  }
}
