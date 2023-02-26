import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $title: Title,
  ) {
    $title.setTitle("Home");
  }
  navToLogin() {
    this.$router.navigate(['auth', 'login'], {relativeTo: this.$route});
  }

  navToRegister() {
    this.$router.navigate(['auth', 'register'], {relativeTo: this.$route});
  }

  navToForgotPassword() {
    this.$router.navigate(['auth', 'forgot-password'], {relativeTo: this.$route});
  }
}
