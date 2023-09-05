import { parseActsCommand } from "../../src/commands/acts";


test('parseCommand of Unknown command', () => {
  const result = parseActsCommand('Unknown', ['1', '0.5470082']);
  expect(result).toEqual({
    name: 'Unknown',
    data: {
      literal: '1 0.5470082'
    }
  });
});

test('parseCommand of Input', () => {
  const result = parseActsCommand('Input', ['1', '0']);
  expect(result).toEqual({
    name: 'Input',
    data: {
      literal: '1 0',
      inputNumber: 1,
      active: false
    }
  });

  const result2 = parseActsCommand('Input', ['1', '1']);
  expect(result2).toEqual({
    name: 'Input',
    data: {
      literal: '1 1',
      inputNumber: 1,
      active: true
    }
  });
});

test('parseCommand of InputPreview', () => {
  const result = parseActsCommand('InputPreview', ['1', '1']);
  expect(result).toEqual({
    name: 'InputPreview',
    data: {
      literal: '1 1',
      inputNumber: 1,
      active: true
    }
  });

  const result2 = parseActsCommand('InputPreview', ['1', '0']);
  expect(result2).toEqual({
    name: 'InputPreview',
    data: {
      literal: '1 0',
      inputNumber: 1,
      active: false
    }
  });
});

test('parseCommand of MasterVolume', () => {
  const result = parseActsCommand('MasterVolume', ['0.5470082']);
  expect(result).toEqual({
    name: 'MasterVolume',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = parseActsCommand('MasterVolume', ['0.948752']);
  expect(result2).toEqual({
    name: 'MasterVolume',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });

});

test('parseCommand of InputVolume', () => {
  const result = parseActsCommand('InputVolume', ['1', '0.5470082']);
  expect(result).toEqual({
    name: 'InputVolume',
    data: {
      inputNumber: 1,
      volume: 0.5470082,
      literal: '1 0.5470082'
    }
  });

  const result2 = parseActsCommand('InputVolume', ['1', '0.948752']);
  expect(result2).toEqual({
    name: 'InputVolume',
    data: {
      inputNumber: 1,
      volume: 0.948752,
      literal: '1 0.948752'
    }
  });
});

test('parseCommand of BusAVolume', () => {
  const result = parseActsCommand('BusAVolume', ['0.5470082']);
  expect(result).toEqual({
    name: 'BusAVolume',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = parseActsCommand('BusAVolume', ['0.948752']);
  expect(result2).toEqual({
    name: 'BusAVolume',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });
});

test('parseCommand of BusBVolume', () => {
  const result = parseActsCommand('BusBVolume', ['0.5470082']);
  expect(result).toEqual({
    name: 'BusBVolume',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = parseActsCommand('BusBVolume', ['0.948752']);
  expect(result2).toEqual({
    name: 'BusBVolume',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });
});

test('parseCommand of MasterHeadphones', () => {
  const result = parseActsCommand('MasterHeadphones', ['0.5470082']);
  expect(result).toEqual({
    name: 'MasterHeadphones',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = parseActsCommand('MasterHeadphones', ['0.948752']);
  expect(result2).toEqual({
    name: 'MasterHeadphones',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });
});

test('parseCommand of MasterAudio', () => {
  const result = parseActsCommand('MasterAudio', ['1']);
  expect(result).toEqual({
    name: 'MasterAudio',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('MasterAudio', ['0']);
  expect(result2).toEqual({
    name: 'MasterAudio',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of MasterAAudio', () => {
  const result = parseActsCommand('MasterAAudio', ['1']);
  expect(result).toEqual({
    name: 'MasterAAudio',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('MasterAAudio', ['0']);
  expect(result2).toEqual({
    name: 'MasterAAudio',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of MasterBAudio', () => {
  const result = parseActsCommand('MasterBAudio', ['1']);
  expect(result).toEqual({
    name: 'MasterBAudio',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('MasterBAudio', ['0']);
  expect(result2).toEqual({
    name: 'MasterBAudio',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of FadeToBlack', () => {
  const result = parseActsCommand('FadeToBlack', ['1']);
  expect(result).toEqual({
    name: 'FadeToBlack',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('FadeToBlack', ['0']);
  expect(result2).toEqual({
    name: 'FadeToBlack',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of Recording', () => {
  const result = parseActsCommand('Recording', ['1']);
  expect(result).toEqual({
    name: 'Recording',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('Recording', ['0']);
  expect(result2).toEqual({
    name: 'Recording',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of Streaming', () => {
  const result = parseActsCommand('Streaming', ['1']);
  expect(result).toEqual({
    name: 'Streaming',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('Streaming', ['0']);
  expect(result2).toEqual({
    name: 'Streaming',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of External', () => {
  const result = parseActsCommand('External', ['1']);
  expect(result).toEqual({
    name: 'External',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('External', ['0']);
  expect(result2).toEqual({
    name: 'External',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of Fullscreen', () => {
  const result = parseActsCommand('Fullscreen', ['1']);
  expect(result).toEqual({
    name: 'Fullscreen',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = parseActsCommand('Fullscreen', ['0']);
  expect(result2).toEqual({
    name: 'Fullscreen',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of InputPlaying', () => {
  const result = parseActsCommand('InputPlaying', ['4', '1']);
  expect(result).toEqual({
    name: 'InputPlaying',
    data: {
      active: true,
      inputNumber: 4,
      literal: '4 1'
    }
  });

  const result2 = parseActsCommand('InputPlaying', ['7', '0']);
  expect(result2).toEqual({
    name: 'InputPlaying',
    data: {
      active: false,
      inputNumber: 7,
      literal: '7 0'
    }
  });
});

test('parseCommand of InputAudio', () => {
  const result = parseActsCommand('InputAudio', ['4', '1']);
  expect(result).toEqual({
    name: 'InputAudio',
    data: {
      active: true,
      inputNumber: 4,
      literal: '4 1'
    }
  });

  const result2 = parseActsCommand('InputAudio', ['7', '0']);
  expect(result2).toEqual({
    name: 'InputAudio',
    data: {
      active: false,
      inputNumber: 7,
      literal: '7 0'
    }
  });
});

test('parseCommand of InputSolo', () => {
  const result = parseActsCommand('InputSolo', ['4', '1']);
  expect(result).toEqual({
    name: 'InputSolo',
    data: {
      active: true,
      inputNumber: 4,
      literal: '4 1'
    }
  });

  const result2 = parseActsCommand('InputSolo', ['7', '0']);
  expect(result2).toEqual({
    name: 'InputSolo',
    data: {
      active: false,
      inputNumber: 7,
      literal: '7 0'
    }
  });
});

test('parseCommand of InputBusAAudio', () => {
  const result = parseActsCommand('InputBusAAudio', ['4', '1']);
  expect(result).toEqual({
    name: 'InputBusAAudio',
    data: {
      active: true,
      inputNumber: 4,
      literal: '4 1'
    }
  });

  const result2 = parseActsCommand('InputBusAAudio', ['7', '0']);
  expect(result2).toEqual({
    name: 'InputBusAAudio',
    data: {
      active: false,
      inputNumber: 7,
      literal: '7 0'
    }
  });
});

test('parseCommand of InputBusBAudio', () => {
  const result = parseActsCommand('InputBusBAudio', ['4', '1']);
  expect(result).toEqual({
    name: 'InputBusBAudio',
    data: {
      active: true,
      inputNumber: 4,
      literal: '4 1'
    }
  });

  const result2 = parseActsCommand('InputBusBAudio', ['7', '0']);
  expect(result2).toEqual({
    name: 'InputBusBAudio',
    data: {
      active: false,
      inputNumber: 7,
      literal: '7 0'
    }
  });
});

test('parseCommand of InputMasterAudio', () => {
  const result = parseActsCommand('InputMasterAudio', ['4', '1']);
  expect(result).toEqual({
    name: 'InputMasterAudio',
    data: {
      active: true,
      inputNumber: 4,
      literal: '4 1'
    }
  });

  const result2 = parseActsCommand('InputMasterAudio', ['7', '0']);
  expect(result2).toEqual({
    name: 'InputMasterAudio',
    data: {
      active: false,
      inputNumber: 7,
      literal: '7 0'
    }
  });
});
