import {CHAPTER_NUMBER} from '../types';

const initialState = {
  chapterNumber: [],
};

export default function bibleDetails(state = initialState, action) {
  switch (action.type) {
    case CHAPTER_NUMBER:
      return Object.assign({}, state, {
        chapterNumber: action.payload,
      });
  }
  return state;
}
