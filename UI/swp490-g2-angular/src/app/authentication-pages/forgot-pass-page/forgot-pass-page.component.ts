import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-pass-page',
  templateUrl: './forgot-pass-page.component.html',
  styleUrls: ['./forgot-pass-page.component.scss']
})
export class ForgotPassPageComponent {
  constructor(
    private $title: Title,
  ) {
    $title.setTitle("Forgot Password");
  }
}
