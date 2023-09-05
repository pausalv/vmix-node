import { ActsResponse } from "./acts-response";

export interface ActsInputVolumeResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    inputNumber: number,
    volume: number,
  };
}

export function parseInputVolume([inputNumber, volume]: string[], name: string): ActsInputVolumeResponse {
  return {
    name,
    data: {
      inputNumber: parseInt(inputNumber),
      volume: parseFloat(volume),
      literal: inputNumber + ' ' + volume
    }
  }
}

