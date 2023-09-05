import { Socket } from 'node:net';

import { EventEmitter } from 'node:events';

import { Tally, TallyArray } from "../commands/tally";
import { parseActsCommand } from "../commands/acts";
import { ActsResponse } from '../commands/acts/acts-response';

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8099;

const LINE_ENDING = "\r\n";

const COMMAND_OK = "OK";
const COMMAND_ERROR = "ER";

export enum ConnectionStates {
  DISCONNECTED,
  CONNECTED
}



interface ConnectionVMixEventsVMixMap {
  tally: (tally: TallyArray) => void,
  acts: (acts: ActsResponse) => void,
  version: (version: string) => void
}

interface ConnectionVMixEventsConnectionMap {
  connect: () => void,
  disconnect: () => void
}

interface ConnectionVMixEventMap extends ConnectionVMixEventsVMixMap, ConnectionVMixEventsConnectionMap { }

interface ConnectionVMixOptions {
  debug?: boolean;
}

export declare interface ConnectionVMix {
  on<T extends keyof ConnectionVMixEventMap>(eventName: T, listener: ConnectionVMixEventMap[T]): this;
  once<T extends keyof ConnectionVMixEventMap>(eventName: T, listener: ConnectionVMixEventMap[T]): this;
  emit<T extends keyof ConnectionVMixEventMap>(event: T, ...args: Parameters<ConnectionVMixEventMap[T]>): boolean;
}

export class ConnectionVMix extends EventEmitter {
  private socket: Socket = new Socket();
  private host: string;
  private port: number;
  private connected: ConnectionStates = ConnectionStates.DISCONNECTED;

  private vMixVersion: string = '';

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

    this.once("version", (version: string) => {
      this.vMixVersion = version;
    });
  }

  public connect(): void {
    if (this.connected == ConnectionStates.CONNECTED) {
      return;
    }
    this.socket.connect(this.port, this.host, () => {
      this.connected = ConnectionStates.CONNECTED;
      this.emit("connect");
      this.options.debug && console.log("Connected to vMix");
    });
  }

  public async connectAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected == ConnectionStates.CONNECTED) {
        resolve();
        return;
      }
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

  public async getTallyAsync(): Promise<TallyArray> {
    return new Promise((resolve, reject) => {
      this.once("tally", (tally: TallyArray) => {
        resolve(tally);
      });
      this.sendCommand("TALLY");
    });
  }

  public getVMixVersion(): string {
    return this.vMixVersion;
  }



  public isConnected(): boolean {
    return this.connected == ConnectionStates.CONNECTED;
  }

  public sendCommand(command: string): void {
    if (!command.endsWith(LINE_ENDING)) {
      command += LINE_ENDING;
    }

    this.options.debug && console.log("Sending command to vMix: ", command);
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

        let [event, status, ...rest] = words;

        event = event.toLowerCase();

        this.options.debug && console.log("Event: ", event, "Status: ", status, "Rest: ", rest);

        if (status == COMMAND_OK) {
          switch (event) {
            case 'tally':
              this.emit(event, Tally.parseCommand(rest[0] || ''));
              break;
            case 'acts':
              const [actsEvent, ...actsRest] = rest || [''];
              this.emit(event, parseActsCommand(actsEvent, actsRest));
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




