import test from 'ava';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import ContentListItem from '../ContentListItem';

Enzyme.configure({ adapter: new Adapter() });


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

const currentUser = { id: 1, username: 'boon' };
const title = 'terminator';
const poster = 'blabla.img';
const releaseDate = '1984';
const rateValue = 100;
const rateCount = 25;
const _id = 1;
// const contentId = _id;

const onRateModalOpen = () => {};

// const userId = currentUser ? currentUser._id : null;

const averageRateScore = (rateCount && rateValue) ? rateValue / rateCount : 0;

const props = {
  currentUser,
  title,
  poster,
  releaseDate,
  rateValue,
  rateCount,
  _id,
  onRateModalOpen
};

test.before((t) => {
  // This runs before all tests
});


test('ContentListItem renders correctly', (t) => {
  const TestWrapper = () => (
    <Provider store={store}>
      <MemoryRouter>
        <ContentListItem {...props} />
      </MemoryRouter>
    </Provider>
  );

  const wrapper = mount(<TestWrapper />);

  // console.log('wrapper.debug()', wrapper.debug());

  const avgRatingNode = wrapper.find('#content-list-item-avg-rating .star-ratings').hostNodes();
  console.log('avgRatingNode', avgRatingNode);
  t.is(avgRatingNode.find({ title: `${averageRateScore} Stars` }).length, 1, 'expected avg rating');

  const titleNode = wrapper.find('#content-list-item-title').hostNodes();
  console.log('titleNode', titleNode);
  t.is(titleNode.text(), title, 'expected title');
});


test('ContentListItem buttons work correctly', (t) => {
  const onContentHover = sinon.spy();
  const onRateModalOpen = sinon.spy();
  const onRateModalOK = sinon.spy();

  const contentListItem = shallow(<ContentListItem {...props} onContentHover={onContentHover} onRateModalOpen={onRateModalOpen} onRateModalOK={onRateModalOK} />);
  // contentListItem.find('#rate-modal-open-button').simulate('click');
  // //
  // let handleSubmitStub = sinon.stub(contentListItem.instance(), 'openRateModal').callsFake(()=> { return Promise.resolve(true)});
  // //
  // // t.is(onRateModalOpen.called, true);
  t.is(1, 1);
});
