import { ActsResponse } from "./acts-response";

export interface ActsVolumeResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    volume: number,
  };
}

export function parseVolume([volume]: string[], name: string): ActsVolumeResponse {
  return {
    name,
    data: {
      volume: parseFloat(volume),
      literal: volume
    }
  }
}