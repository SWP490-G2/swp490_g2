import { Component, OnInit } from '@angular/core';
import { Client, User } from '../ngswag/client';

@Component({
  selector: 'app-app-pages',
  templateUrl: './app-pages.component.html',
  styleUrls: ['./app-pages.component.scss']
})
export class AppPagesComponent implements OnInit{
  user?: User;

  constructor(
    private $client: Client
  ) {

  }
  ngOnInit(): void {
    this.$client.getCurrentUser().subscribe({
      next: (user: User) => {
        // this.user: thuoc ve AppPages
        // user: from API
        this.user = user;
      }
    })
  }
}
