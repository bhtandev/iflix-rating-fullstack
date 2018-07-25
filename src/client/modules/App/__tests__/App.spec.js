import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { App } from '../App';

Enzyme.configure({ adapter: new Adapter() });

test('App renders', (t) => {
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

  const store = mockStore(initialState);

  const asyncDispatchStub = () => {};

  const AppInstance = <App getAllUsers={asyncDispatchStub} getAllContents={asyncDispatchStub} />;

  const TestWrapper = () => (
    <Provider store={store}>
      <MemoryRouter>
        {AppInstance}
      </MemoryRouter>
    </Provider>
  );

  const wrapper = mount(
    <TestWrapper />
  );
  // console.log('wrapper.debug()', wrapper.debug());

  t.is(wrapper.find('#app-bar').hostNodes().length, 1);
  t.is(wrapper.find('#app-title').hostNodes().length, 1);
  t.is(wrapper.find('#app-body').hostNodes().length, 1);
  // console.log('wrapper.html()', wrapper.html());
});
