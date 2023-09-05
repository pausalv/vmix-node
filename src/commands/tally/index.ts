export enum TallyStates {
  NONE = 0,
  PROGRAM = 1,
  PREVIEW = 2
}

export type TallyArray = TallyStates[];

export abstract class Tally {

  public static parseCommand(tally: string): TallyArray {

    return [...tally].map((t): TallyStates => {
      switch (t) {
        case '0':
          return TallyStates.NONE;
        case '1':
          return TallyStates.PROGRAM;
        case '2':
          return TallyStates.PREVIEW;
        default:
          return TallyStates.NONE;
      }
    });

  }
}
