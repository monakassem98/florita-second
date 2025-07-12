import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isUserStatus: boolean = false;
  userName: string = '';
  navStatus: string = 'default';
  cartItems: number = 0;

  constructor(private route: Router) {}

  toggleUserStatus() {
    this.isUserStatus = !this.isUserStatus;
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }
}
