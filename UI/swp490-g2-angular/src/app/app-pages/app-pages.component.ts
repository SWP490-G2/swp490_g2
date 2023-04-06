import { Component, OnInit } from "@angular/core";
import { AuthService } from "../global/auth.service";
import { Client, Notification, User } from "../ngswag/client";
import { WebsocketService } from "../global/websocket.service";
import { of, switchMap } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-app-pages",
  templateUrl: "./app-pages.component.html",
  styleUrls: ["./app-pages.component.scss"],
})
export class AppPagesComponent implements OnInit {
  user?: User;

  constructor(
    private $client: Client,
    private $auth: AuthService,
    private $webSocket: WebsocketService,
    private $message: MessageService
  ) {}
  ngOnInit(): void {
    this.$auth
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.user = user;
          // this.user: thuoc ve AppPages
          // user: from API
          this.user = user;

          this.$webSocket.connect("/notification", (res) => {
            const notification = Notification.fromJS(JSON.parse(res.body));
            if (notification.userId === this.user?.id) {
              this.$message.add({
                severity: "info",
                summary: "Notification",
                detail: notification.message,
              });
            }
          });

          return of();
        })
      )
      .subscribe();
  }
}
