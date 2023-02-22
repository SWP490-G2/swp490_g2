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

  navToRegister() {
    this.$router.navigate(['auth', 'register'], {relativeTo: this.$route});
  }
}
