import { Injectable } from "@angular/core";
import * as Rx from "rxjs";

// Declare SockJS and Stomp
declare let SockJS;
declare let Stomp;

@Injectable({ providedIn: "root" })
export class WebsocketService {
  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient;

  initializeWebSocketConnection() {
    const serverUrl = "http://localhost:8080/socket";
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe("/message", (message: any) => {
        console.log(message.body);
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message", {}, message);
  }
}
