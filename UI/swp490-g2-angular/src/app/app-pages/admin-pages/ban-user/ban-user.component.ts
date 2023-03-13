import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ban-user",
  templateUrl: "./ban-user.component.html",
})
export class BanUserComponent implements OnInit {
  selectedReason: string[] = [];
  checked = false;
  ngOnInit(): void {}
}
