import { ActsResponse } from "./acts-response";

export interface ActsActiveResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    active: boolean,
  };
}

export function parseActive([active]: string[], name: string): ActsActiveResponse {
  return {
    name,
    data: {
      active: active === '1',
      literal: active
    }
  }
}

