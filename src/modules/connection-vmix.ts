import { Socket } from "net";

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8099;

export enum ConnectionStates {
  DISCONNECTED,
  CONNECTED
}

export class ConnectionVMix extends EventTarget {
  private socket: Socket = new Socket();
  private host: string;
  private port: number;
  private connected: ConnectionStates = ConnectionStates.DISCONNECTED;

  constructor(host: string = DEFAULT_HOST, port: number = DEFAULT_PORT) {
    super();

    this.host = host;
    this.port = port;
  }

  public connect(): void {
    this.socket.connect(this.port, this.host, () => {
      this.connected = ConnectionStates.CONNECTED;
      console.log("Connected to vMix");
    });
  }

  public disconnect(): void {
    this.socket.end();
    this.connected = ConnectionStates.DISCONNECTED;
    console.log("Disconnected from vMix");
  }

  public isConnected(): ConnectionStates {
    return this.connected;
  }

  public sendCommand(command: string): void {
    this.socket.write(command);
  }
}
