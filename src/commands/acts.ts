interface ActsTypes {
  Input: ActsInput
}


export interface ActsResponse {
  name: string,
  data: string | object;
}

export abstract class Acts {

  public static parseCommand(acts: string[]): ActsResponse {
    const [name, ...data] = acts;
    return {
      name,
      data: data.join(' ')
    }
  }

}

enum ActsInputTypes {
  IN,
  OUT
}

export interface ActsInput extends ActsResponse {
  name: string,
  data: {
    inputNumber: number,
    inputType: ActsInputTypes
  };
}