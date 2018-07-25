import test from 'ava';
import { reducerTest } from 'redux-ava';
import contentReducer, { getContent, getContents } from '../ContentReducer';
import { updateContent, addContents } from '../ContentActions';

test('action for ADD_CONTENTS is working', reducerTest(
  contentReducer,
  {
    data: []
  },
  addContents([{
    title: 'boon',
    _id: 1,
  }, {
    title: 'hui',
    _id: 2,
  }]),
  {
    data: [{
      title: 'boon',
      _id: 1,
    }, {
      title: 'hui',
      _id: 2,
    }]
  },
));

test('action for UPDATE_CONTENT is working', reducerTest(
  contentReducer,
  {
    data: [{
      title: 'boon',
      _id: 1,
    }, {
      title: 'hui',
      _id: 2,
    }]
  },
  updateContent(
    {
      title: 'terminator',
      _id: 1,
    },
  ),
  {
    data: [{
      title: 'terminator',
      _id: 1,
    }, {
      title: 'hui',
      _id: 2,
    }]
  },
));

test('getContents selector', (t) => {
  t.deepEqual(
    getContents({
      contents: {
        data: [{
          title: 'terminator',
          _id: 1,
        }, {
          title: 'hui',
          _id: 2,
        }]
      },
    }),
    [{
      title: 'terminator',
      _id: 1,
    }, {
      title: 'hui',
      _id: 2,
    }]
  );
});

test('getContent selector', (t) => {
  t.deepEqual(
    getContent({
      contents: { data: [{ _id: 'abc' }] },
    }, 'abc'),
    { _id: 'abc' }
  );
});
