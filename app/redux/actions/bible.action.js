import {CHAPTER_NUMBER} from '../types';

export const setChapterNumber = (value) => {
  return {
    type: CHAPTER_NUMBER,
    payload: value,
  };
};
