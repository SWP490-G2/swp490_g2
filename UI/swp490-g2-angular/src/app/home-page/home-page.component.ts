import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navToRegister() {
    this.router.navigate(['register'], {relativeTo: this.route});
  }
}
