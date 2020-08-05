import {combineReducers} from 'redux';
import OfferingReducer from './offering.reducer';
import UserReducer from './user.reducer';
import PodcastReducer from './podcast.reducer';
import BibleReducer from './bible.reducer';

export default combineReducers({
  offering: OfferingReducer,
  user: UserReducer,
  podcast: PodcastReducer,
  bible: BibleReducer,
});
