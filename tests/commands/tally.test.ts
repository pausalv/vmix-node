import { Tally, TallyArray, TallyStates } from "../../src/commands/tally";


test('parseCommand of Tally', () => {
  const result: TallyArray = Tally.parseCommand('012');
  expect(result).toEqual([TallyStates.NONE, TallyStates.PROGRAM, TallyStates.PREVIEW]);

  const result2: TallyArray = Tally.parseCommand('010');
  expect(result2).toEqual([TallyStates.NONE, TallyStates.PROGRAM, TallyStates.NONE]);

  const result3: TallyArray = Tally.parseCommand('000');
  expect(result3).toEqual([TallyStates.NONE, TallyStates.NONE, TallyStates.NONE]);

  const result4: TallyArray = Tally.parseCommand('10020');
  expect(result4).toEqual([TallyStates.PROGRAM, TallyStates.NONE, TallyStates.NONE, TallyStates.PREVIEW, TallyStates.NONE]);

});
