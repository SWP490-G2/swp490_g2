import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent
{
  // To change title, we need to import title service
  constructor(
    private $title: Title,
  )
  {
    $title.setTitle("Register");
  }
}
