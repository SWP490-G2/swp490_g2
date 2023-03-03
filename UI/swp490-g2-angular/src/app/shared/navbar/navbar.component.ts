import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/global/auth.service';
import { User } from 'src/app/ngswag/client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // @Input: duoc truyen vao tu parent
  @Input() user?: User;

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $title: Title,
    private $auth: AuthService
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

  getUserDisplay(): string {
    // Thoa man 2 dieu kien:
    // 1. this.user ton tai
    // 2. this.user.email ton tai
    if (this.userExisted()) {
      // if(this.user?.email)
      // this.user.email: string | undefined
      return <string>this.user?.email;
    }

    return 'Account';
  }

  userExisted(): boolean {
    // !! giup ep kieu sang boolean
    return !!(this.user && this.user.email);
  }

  logOut(): void {
    this.$auth.logout();
  }
}
