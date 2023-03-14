import { Component, OnInit } from "@angular/core";
import { AllRes } from "src/app/utils/allres";

@Component({
  selector: "app-change-avatar-cover",
  templateUrl: "./change-avatar-cover.component.html",
})
export class ChangeAvatarCoverComponent implements OnInit {
  resOpening: AllRes[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
