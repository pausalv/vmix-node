import { Acts } from "../../src";

test('parseCommand of Unknown command', () => {
  const result = Acts.parseCommand('Unknown', ['1', '0.5470082']);
  expect(result).toEqual({
    name: 'Unknown',
    data: {
      literal: '1 0.5470082'
    }
  });
});

test('parseCommand of Input', () => {
  const result = Acts.parseCommand('Input', ['1', '0']);
  expect(result).toEqual({
    name: 'Input',
    data: {
      literal: '1 0',
      inputNumber: 1,
      active: false
    }
  });

  const result2 = Acts.parseCommand('Input', ['1', '1']);
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
  const result = Acts.parseCommand('InputPreview', ['1', '1']);
  expect(result).toEqual({
    name: 'InputPreview',
    data: {
      literal: '1 1',
      inputNumber: 1,
      active: true
    }
  });

  const result2 = Acts.parseCommand('InputPreview', ['1', '0']);
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
  const result = Acts.parseCommand('MasterVolume', ['0.5470082']);
  expect(result).toEqual({
    name: 'MasterVolume',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = Acts.parseCommand('MasterVolume', ['0.948752']);
  expect(result2).toEqual({
    name: 'MasterVolume',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });

});

test('parseCommand of InputVolume', () => {
  const result = Acts.parseCommand('InputVolume', ['1', '0.5470082']);
  expect(result).toEqual({
    name: 'InputVolume',
    data: {
      inputNumber: 1,
      volume: 0.5470082,
      literal: '1 0.5470082'
    }
  });

  const result2 = Acts.parseCommand('InputVolume', ['1', '0.948752']);
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
  const result = Acts.parseCommand('BusAVolume', ['0.5470082']);
  expect(result).toEqual({
    name: 'BusAVolume',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = Acts.parseCommand('BusAVolume', ['0.948752']);
  expect(result2).toEqual({
    name: 'BusAVolume',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });
});

test('parseCommand of BusBVolume', () => {
  const result = Acts.parseCommand('BusBVolume', ['0.5470082']);
  expect(result).toEqual({
    name: 'BusBVolume',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = Acts.parseCommand('BusBVolume', ['0.948752']);
  expect(result2).toEqual({
    name: 'BusBVolume',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });
});

test('parseCommand of MasterHeadphones', () => {
  const result = Acts.parseCommand('MasterHeadphones', ['0.5470082']);
  expect(result).toEqual({
    name: 'MasterHeadphones',
    data: {
      volume: 0.5470082,
      literal: '0.5470082'
    }
  });

  const result2 = Acts.parseCommand('MasterHeadphones', ['0.948752']);
  expect(result2).toEqual({
    name: 'MasterHeadphones',
    data: {
      volume: 0.948752,
      literal: '0.948752'
    }
  });
});

test('parseCommand of MasterAudio', () => {
  const result = Acts.parseCommand('MasterAudio', ['1']);
  expect(result).toEqual({
    name: 'MasterAudio',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('MasterAudio', ['0']);
  expect(result2).toEqual({
    name: 'MasterAudio',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of MasterAAudio', () => {
  const result = Acts.parseCommand('MasterAAudio', ['1']);
  expect(result).toEqual({
    name: 'MasterAAudio',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('MasterAAudio', ['0']);
  expect(result2).toEqual({
    name: 'MasterAAudio',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of MasterBAudio', () => {
  const result = Acts.parseCommand('MasterBAudio', ['1']);
  expect(result).toEqual({
    name: 'MasterBAudio',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('MasterBAudio', ['0']);
  expect(result2).toEqual({
    name: 'MasterBAudio',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of FadeToBlack', () => {
  const result = Acts.parseCommand('FadeToBlack', ['1']);
  expect(result).toEqual({
    name: 'FadeToBlack',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('FadeToBlack', ['0']);
  expect(result2).toEqual({
    name: 'FadeToBlack',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of Recording', () => {
  const result = Acts.parseCommand('Recording', ['1']);
  expect(result).toEqual({
    name: 'Recording',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('Recording', ['0']);
  expect(result2).toEqual({
    name: 'Recording',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of Streaming', () => {
  const result = Acts.parseCommand('Streaming', ['1']);
  expect(result).toEqual({
    name: 'Streaming',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('Streaming', ['0']);
  expect(result2).toEqual({
    name: 'Streaming',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of External', () => {
  const result = Acts.parseCommand('External', ['1']);
  expect(result).toEqual({
    name: 'External',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('External', ['0']);
  expect(result2).toEqual({
    name: 'External',
    data: {
      active: false,
      literal: '0'
    }
  });
});

test('parseCommand of Fullscreen', () => {
  const result = Acts.parseCommand('Fullscreen', ['1']);
  expect(result).toEqual({
    name: 'Fullscreen',
    data: {
      active: true,
      literal: '1'
    }
  });

  const result2 = Acts.parseCommand('Fullscreen', ['0']);
  expect(result2).toEqual({
    name: 'Fullscreen',
    data: {
      active: false,
      literal: '0'
    }
  });
});

