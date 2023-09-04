
// For now, only the ones marked with 
// ✅ are implemented
// ✔️ are implemented but not tested with vMix

/* Activators from vMix
- ✅ Input
- ✅ InputPreview
- InputPlaying
- ✅ InputVolume
- InputHeadphones
- ✅ MasterVolume
- ✔️ MasterHeadphones
- ✔️ BusAVolume
- ✔️ BusBVolume
- InputAudio
- InputSolo
- InputBusAAudio
- InputBusBAudio
- InputMasterAudio
- ✔️ MasterAudio
- ✔️ MasterAAudio
- ✔️ MasterBAudio
- FadeToBlack
- Recording
- Streaming
- External
- Fullscreen
*/

enum ActsActivators {
  Input,
  InputPreview,
  InputPlaying,
  InputVolume,
  InputHeadphones,
  MasterVolume,
  MasterHeadphones,
  BusAVolume,
  BusBVolume,
  InputAudio,
  InputSolo,
  InputBusAAudio,
  InputBusBAudio,
  InputMasterAudio,
  MasterAudio,
  MasterAAudio,
  MasterBAudio,
  FadeToBlack,
  Recording,
  Streaming,
  External,
  Fullscreen
}

// Acts Commands
interface ActsType {
  Input: ActsInputResponse,
  InputPreview: ActsInputResponse,
  MasterVolume: ActsVolumeResponse,
  InputVolume: ActsInputVolumeResponse,
  BusAVolume: ActsVolumeResponse,
  BusBVolume: ActsVolumeResponse,
  MasterHeadphones: ActsVolumeResponse,
  MasterAudio: ActsAudioResponse,
  MasterAAudio: ActsAudioResponse,
  MasterBAudio: ActsAudioResponse,
  [key: string]: ActsResponse
}

// Acts parse functions
const acts: ActsParseFunctions = {
  Input: parseInput,
  InputPreview: parseInputPreview,
  MasterVolume: parseMasterVolume,
  InputVolume: parseInputVolume,
  BusAVolume: parseBusAVolume,
  BusBVolume: parseBusBVolume,
  MasterHeadphones: parseMasterHeadphones,
  MasterAudio: parseMasterAudio,
  MasterAAudio: parseMasterAAudio,
  MasterBAudio: parseMasterBAudio
}

export abstract class Acts {

  public static parseCommand<T extends keyof ActsType>(name: T, data: string[]): ActsType[T] {
    if (acts[name]) {
      return acts[name](data);
    } else {
      return defaultParse([name.toString(), ...data]);
    }
  }
}

/* Parsers */

function defaultParse([name, ...data]: string[]): ActsResponse {
  return {
    name,
    data: {
      literal: data.join(' ')
    }
  }
}

function parseInput([inputNumber, inputType]: string[], name?: string): ActsInputResponse {
  return {
    name: name ?? 'Input',
    data: {
      inputNumber: parseInt(inputNumber),
      active: inputType === '1',
      literal: inputNumber + " " + inputType
    }
  }
}

function parseInputPreview(data: string[]): ActsInputResponse {
  return parseInput(data, 'InputPreview');
}

function parseVolume(volume: string, name: string): ActsVolumeResponse {
  return {
    name,
    data: {
      volume: parseFloat(volume),
      literal: volume
    }
  }
}

function parseMasterVolume([volume]: string[]): ActsVolumeResponse {
  return parseVolume(volume, 'MasterVolume');
}

function parseBusAVolume([volume]: string[]): ActsVolumeResponse {
  return parseVolume(volume, 'BusAVolume');
}

function parseBusBVolume([volume]: string[]): ActsVolumeResponse {
  return parseVolume(volume, 'BusBVolume');
}

function parseMasterHeadphones([volume]: string[]): ActsVolumeResponse {
  return parseVolume(volume, 'MasterHeadphones');
}

function parseInputVolume([inputNumber, volume]: string[]): ActsInputVolumeResponse {
  return {
    name: 'InputVolume',
    data: {
      inputNumber: parseInt(inputNumber),
      volume: parseFloat(volume),
      literal: inputNumber + ' ' + volume
    }
  }
}

function parseAudio([active]: string[], name: string): ActsAudioResponse {
  return {
    name,
    data: {
      active: active === '1',
      literal: active
    }
  }
}

function parseMasterAudio([active]: string[]): ActsAudioResponse {
  return parseAudio([active], 'MasterAudio');
}

function parseMasterAAudio([active]: string[]): ActsAudioResponse {
  return parseAudio([active], 'MasterAAudio');
}

function parseMasterBAudio([active]: string[]): ActsAudioResponse {
  return parseAudio([active], 'MasterBAudio');
}

/* Interfaces & Types */

type ActsParseFunctions = {
  [key in keyof ActsType]: (data: string[]) => ActsType[key]
}

export interface ActsResponse {
  name: string,
  data: ActsData
}

interface ActsData {
  literal: string
}

export interface ActsInputResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    inputNumber: number,
    active: boolean,
  };
}

export interface ActsVolumeResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    volume: number,
  };
}

export interface ActsInputVolumeResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    inputNumber: number,
    volume: number,
  };
}

export interface ActsAudioResponse extends ActsResponse {
  name: string,
  data: {
    literal: string
    active: boolean,
  };
}