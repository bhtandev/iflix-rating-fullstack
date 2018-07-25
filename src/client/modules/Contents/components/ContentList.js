import React from 'react';
import ContentListItem from './ContentListItem';
import HorizontalScrollContainer from '../../../components/HorizontalScrollContainer';

const ContentList = (props) => {
  if (props.contents) {
    return (
      <HorizontalScrollContainer>
        {
          props.contents.map((movie, index) => (
            <ContentListItem
              key={index}
              {...movie}
              {...props}
            />
          ))
        }
      </HorizontalScrollContainer>
    );
  }
  return null;
};

export default ContentList;
