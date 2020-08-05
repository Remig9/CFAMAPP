import { PAUSE_AUDIO } from "../types";

export const setPauseAudio = (value) => {
  return {
    type: PAUSE_AUDIO,
    payload: value,
  };
};
