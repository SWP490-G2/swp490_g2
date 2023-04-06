import { Component, NgZone, OnInit } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { WebsocketService } from "./global/websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "swp490-g2-angular";

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
