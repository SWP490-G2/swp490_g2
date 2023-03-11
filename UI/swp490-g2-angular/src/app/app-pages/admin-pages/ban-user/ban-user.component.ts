import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ban-user",
  templateUrl: "./ban-user.component.html",
  styleUrls: ["./ban-user.component.scss"]
})
export class BanUserComponent implements OnInit{
  selectedReason: string[] = [];
  checked = false;
  ngOnInit(): void {}
}
