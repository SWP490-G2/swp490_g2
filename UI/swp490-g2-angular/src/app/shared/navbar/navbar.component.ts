import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $title: Title
  ) {
    $title.setTitle('Home');
  }
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-book',
      },
      {
        label: 'My Order',
        icon: 'pi pi-fw pi-shopping-bag',
      },
      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
      },
      {
        label: 'Notifications',
        icon: 'pi pi-fw pi-bell',
      },
    ];
  }

  navToHome() {
    this.$router.navigate([''], { relativeTo: this.$route });
  }

  navToLogin() {
    this.$router.navigate(['auth', 'login'], { relativeTo: this.$route });
  }

  navToRegister() {
    this.$router.navigate(['auth', 'register'], { relativeTo: this.$route });
  }

  navToForgotPassword() {
    this.$router.navigate(['auth', 'forgot-password'], {
      relativeTo: this.$route,
    });
  }
}
