import { Socket } from "net";

import { EventEmitter } from 'node:events';

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8099;

const LINE_ENDING = "\r\n";

export enum ConnectionStates {
  DISCONNECTED,
  CONNECTED
}

interface ConnectionVMixEventMap {
  connect: () => void;
  disconnect: () => void;
  tally: (tally: string) => void;
  acts: (acts: string) => void;
  version: (version: string) => void;
}

interface ConnectionVMixOptions {
  debug?: boolean;
}

export declare interface ConnectionVMix {
  on<T extends keyof ConnectionVMixEventMap>(eventName: T, listener: ConnectionVMixEventMap[T]): this;
  emit<T extends keyof ConnectionVMixEventMap>(event: T, ...args: Parameters<ConnectionVMixEventMap[T]>): boolean;
}

export class ConnectionVMix extends EventEmitter {
  private socket: Socket = new Socket();
  private host: string;
  private port: number;
  private connected: ConnectionStates = ConnectionStates.DISCONNECTED;

  private options: ConnectionVMixOptions = {
    debug: false
  };

  constructor(host: string = DEFAULT_HOST, port: number = DEFAULT_PORT, options?: ConnectionVMixOptions) {
    super();

    this.host = host;
    this.port = port;

    if (options) {
      this.options = options;
    }

    this.socket.on("data", (data) => {
      this.processData(data);
    });
  }

  public connect(): void {
    this.socket.connect(this.port, this.host, () => {
      this.connected = ConnectionStates.CONNECTED;
      this.emit("connect");
      this.options.debug && console.log("Connected to vMix");
    });
  }

  public async connectAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect(this.port, this.host, () => {
        this.connected = ConnectionStates.CONNECTED;
        this.emit("connect");
        this.options.debug && console.log("Connected to vMix");
        resolve();
      });
    });
  }

  public disconnect(): void {
    this.socket.end();
    this.connected = ConnectionStates.DISCONNECTED;
    this.emit("disconnect");
    this.options.debug && console.log("Disconnected from vMix");
  }

  public async disconnectAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.end(() => {
        this.connected = ConnectionStates.DISCONNECTED;
        this.emit("disconnect");
        this.options.debug && console.log("Disconnected from vMix");
        resolve();
      });
    });
  }

  public isConnected(): boolean {
    return this.connected == ConnectionStates.CONNECTED;
  }

  public sendCommand(command: string): void {
    this.socket.write(command + LINE_ENDING);
  }

  public subscribe(sub: string): void {
    this.sendCommand(`SUBSCRIBE ${sub}`);
  }

  public unsubscribe(sub: string): void {
    this.sendCommand(`UNSUBSCRIBE ${sub}`);
  }

  private processData(data: Buffer): void {
    let message = data.toString();
    let lines = message.split(LINE_ENDING);
    this.options.debug && console.log("Received data from vMix: ", lines);

    lines.forEach((line) => {
      if (line.length > 0) {
        const words = line.split(" ");
        let event = words[0].toLowerCase();

        if (words[1] == 'OK') {
          switch (event) {
            case 'tally':
              this.emit(event, words[2] || '');
              break;
            case 'acts':
              this.emit(event, words[2] || '');
              break;
            case 'version':
              this.emit(event, words[2] || '');
              break;
            default:
              //THROW ERROR
              break;
          }
        } else {
          //THROW ERROR
        }

      }
    });
  }

}

interface TallyEvent extends Event {
  data: string;
}


