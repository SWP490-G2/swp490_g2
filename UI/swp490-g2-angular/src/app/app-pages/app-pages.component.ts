import { Component, OnInit } from '@angular/core';
import { AuthService } from '../global/auth.service';
import { Client, User } from '../ngswag/client';

@Component({
  selector: 'app-app-pages',
  templateUrl: './app-pages.component.html',
  styleUrls: ['./app-pages.component.scss']
})
export class AppPagesComponent implements OnInit{
  user?: User;

  constructor(
    private $client: Client,
    private $auth: AuthService,
  ) {

  }
  ngOnInit(): void {
    this.$auth.getCurrentUser().subscribe({
      next: (user?: User) => {
        // this.user: thuoc ve AppPages
        // user: from API
        this.user = user;
      }
    })
  }
}
