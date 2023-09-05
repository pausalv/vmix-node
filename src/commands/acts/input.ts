import { ActsResponse } from "./acts-response";

export interface ActsInputResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    inputNumber: number,
    active: boolean,
  };
}

export function parseInput([inputNumber, inputType]: string[], name?: string): ActsInputResponse {
  return {
    name: name ?? 'Input',
    data: {
      inputNumber: parseInt(inputNumber),
      active: inputType === '1',
      literal: inputNumber + " " + inputType
    }
  }
}