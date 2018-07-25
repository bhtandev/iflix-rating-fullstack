import test from 'ava';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContentList from '../ContentList';

Enzyme.configure({ adapter: new Adapter() });

test('ContentList renders itesm in list', (t) => {
  const mockStore = configureStore();
  const initialState = {
    users: {
      data: [
        { id: 0, username: 'boon' },
        { id: 1, username: 'hui' },
      ]
    },
    contents: {
      data: [
        { id: 0, title: 'terminator', releaseDate: '1980' },
        { id: 1, title: 'die hard', releaseDate: '1990' },
      ]
    }
  };

  const contents = [
    { id: 0, title: 'terminator', releaseDate: '1980' },
    { id: 1, title: 'die hard', releaseDate: '1990' },
  ];

  const store = mockStore(initialState);

  const TestWrapper = () => (
    <Provider store={store}>
      <MemoryRouter>
        <ContentList contents={contents} />
      </MemoryRouter>
    </Provider>
  );

  const wrapper = mount(<TestWrapper />);

  // console.log('wrapper.debug()', wrapper.debug());

  t.is(wrapper.find('#content-list-item').hostNodes().length, 2);
});
