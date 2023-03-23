import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ban-user-apply",
  templateUrl: "./ban-user-apply.component.html",
})
export class BanUserApplyComponent implements OnInit {
  selectedReason: string[] = [];
  checked = false;
  ngOnInit(): void {}
}
