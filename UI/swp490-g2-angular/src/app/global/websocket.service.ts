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

  public stompClient: any;

  private initializeWebSocketConnection() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // tslint:disable-next-line:only-arrow-functions
  }

  /**
   *
   * @param endPoint : Example "/notification"
   */
  connect(endPoint: string, event: (message: any) => void) {
    const serverUrl = "http://localhost:8080/socket";
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(endPoint, event);
    });
  }

  // sendMessage(message) {
  //   this.stompClient.send("/app/send/message", {}, message);
  // }
}
