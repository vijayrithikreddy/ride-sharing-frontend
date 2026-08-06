import { Client } from "@stomp/stompjs"; 
import SockJS from "sockjs-client/dist/sockjs";
import type { IMessage } from "@stomp/stompjs";

class WebSocketService {
  private client: Client | null = null;

  private connected = false;

  private pendingSubscriptions: Array<() => void> = [];

  connect() {
    if (this.connected || this.client) {
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8083/ws"),

      reconnectDelay: 5000,

      debug: (msg) => {
        console.log(msg);
      },

      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        this.connected = true;

        this.pendingSubscriptions.forEach((subscribe) => subscribe());

        this.pendingSubscriptions = [];
      },

      onDisconnect: () => {
        console.log("❌ Disconnected");

        this.connected = false;
      },

      onStompError: (frame) => {
        console.error("STOMP Error", frame);
      },
    });

    this.client.activate();
  }

  subscribe(
    destination: string,
    callback: (message: any) => void
  ) {
    const subscribeAction = () => {
      this.client?.subscribe(destination, (message: IMessage) => {
        callback(JSON.parse(message.body));
      });

      console.log("Subscribed :", destination);
    };

    if (this.connected) {
      subscribeAction();
    } else {
      this.pendingSubscriptions.push(subscribeAction);
    }
  }

  send(destination: string, body: any) {
    if (!this.connected || !this.client) {
      console.warn("WebSocket not connected.");
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }

    this.client = null;
    this.connected = false;
    this.pendingSubscriptions = [];
  }

  isConnected() {
    return this.connected;
  }
}

export default new WebSocketService();