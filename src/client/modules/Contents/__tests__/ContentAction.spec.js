import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  UPDATE_CONTENT,
  ADD_CONTENTS,
  updateContent,
  addContents,
} from '../ContentActions';

const content = {
  title: 'Terminator', _id: 1, releaseDate: '1980'
};

test('should return the correct type for updateContent', actionTest(
  updateContent,
  content,
  { type: UPDATE_CONTENT, content, id: content._id },
));

test('should return the correct type for addContents', actionTest(
  addContents,
  [content],
  { type: ADD_CONTENTS, contents: [content] },
));
