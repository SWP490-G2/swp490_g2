import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Client } from "src/app/ngswag/client";

@Component({
  selector: 'app-code-validator',
  templateUrl: './code-validator.component.html',
  styleUrls: ['./code-validator.component.scss']
})
export class CodeValidatorComponent implements OnInit {

  client = new Client();
  visible = true;
  @Input() email = "longlunglay5@gmail.com";
  code = "";

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.email);
  }

  async submit() {
    try {
      await this.client.verifyCode(this.email, this.code);
      console.log("Account registered successfully");
    } catch (err) {
      alert("Invalid code verification");
    } finally {
      
    }
  }
}
