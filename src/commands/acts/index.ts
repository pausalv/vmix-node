
import { ActsActiveResponse, parseActive } from "./active";
import { ActsResponse } from "./acts-response";
import { ActsInputResponse, parseInput } from "./input";
import { ActsInputVolumeResponse, parseInputVolume } from "./input-volume";
import { ActsVolumeResponse, parseVolume } from "./volume";

export {
  ActsResponse,
  ActsActiveResponse,
  ActsInputResponse,
  ActsInputVolumeResponse,
  ActsVolumeResponse
}

// For now, only the ones marked with 
// ✅ are implemented
// ✔️ are implemented but not tested with vMix
/* Activators from vMix
- ✅ Input 6 1
- ✅ InputPreview 6 1
- ✅ InputPlaying 6 1
- ✅ InputVolume 1 0.5470082
- InputHeadphones
- ✅ MasterVolume 0.5470082
- ✅ MasterHeadphones 0.5470082
- ✅ BusAVolume 0.5470082
- ✅ BusBVolume 0.5470082
- ❗ BusCVolume 0.5470082
- ✅ InputAudio 6 1
- ✅ InputSolo 6 1
- ✅ InputBusAAudio 6 1
- ✅ InputBusBAudio 6 1
- ❗ InputBusCAudio 6 1
- ✅ InputMasterAudio 6 1
- ✅ MasterAudio 1
- ✅ MasterAAudio 1
- ✅ MasterBAudio 1
- ✅ FadeToBlack 1
- ✅ Recording 1
- ✅ Streaming 1
- ✅ External 1
- ✅ Fullscreen 1
*/

enum Activators {
  Input,
  InputPreview,
  InputPlaying,
  InputVolume,
  // InputHeadphones,
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
interface ActsType extends ActsTypeInterface {
  Input: ActsInputResponse,
  InputPreview: ActsInputResponse,
  MasterVolume: ActsVolumeResponse,
  InputVolume: ActsInputVolumeResponse,
  BusAVolume: ActsVolumeResponse,
  BusBVolume: ActsVolumeResponse,
  MasterHeadphones: ActsVolumeResponse,
  MasterAudio: ActsActiveResponse,
  MasterAAudio: ActsActiveResponse,
  MasterBAudio: ActsActiveResponse,
  FadeToBlack: ActsActiveResponse,
  Recording: ActsActiveResponse,
  Streaming: ActsActiveResponse,
  External: ActsActiveResponse,
  Fullscreen: ActsActiveResponse,
  InputPlaying: ActsInputResponse,
  InputAudio: ActsInputResponse,
  InputSolo: ActsInputResponse,
  InputBusAAudio: ActsInputResponse,
  InputBusBAudio: ActsInputResponse,
  InputMasterAudio: ActsInputResponse,
  [key: string]: ActsResponse
}

// Acts parse functions
const acts: ActsParseFunctions = {
  Input: parseInput,
  InputPreview: parseInput,
  MasterVolume: parseVolume,
  InputVolume: parseInputVolume,
  BusAVolume: parseVolume,
  BusBVolume: parseVolume,
  MasterHeadphones: parseVolume,
  MasterAudio: parseActive,
  MasterAAudio: parseActive,
  MasterBAudio: parseActive,
  FadeToBlack: parseActive,
  Recording: parseActive,
  Streaming: parseActive,
  External: parseActive,
  Fullscreen: parseActive,
  InputPlaying: parseInput,
  InputAudio: parseInput,
  InputSolo: parseInput,
  InputBusAAudio: parseInput,
  InputBusBAudio: parseInput,
  InputMasterAudio: parseInput
}

// export abstract class Acts {

// public static parseCommand<T extends keyof ActsType>(name: T, data: string[]): ActsType[T] {
export function parseActsCommand<T extends keyof typeof Activators | string>(name: T, data: string[]): ActsType[T] {
  if (acts[name]) {
    return acts[name](data, name);
  } else {
    return defaultParse([...data], name);
  }
}
// }

/* Parsers */

function defaultParse(data: string[], name: string): ActsResponse {
  return {
    name,
    data: {
      literal: data.join(' ')
    }
  }
}

/* Interfaces & Types */

type ActsTypeInterface = { [key in keyof typeof Activators]: ActsResponse };

type ActsParseFunctions = {
  [key in keyof ActsType]: (data: string[], name: string) => ActsType[key]
}
