import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { VelocityComponent } from 'velocity-react';
import { Link, withRouter } from 'react-router-dom';

import imageMap from '../../../images/imageMap';

const PlayButtonWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 210px;
  height: 312px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class ContentThumbnail extends Component {
  static propTypes = {
    onShowPlay: PropTypes.func,
    onHidePlay: PropTypes.func,
    showPlay: PropTypes.bool,
    content: PropTypes.object,
  };

  render() {
    const {
      onShowPlay, onHidePlay, showPlay, content
    } = this.props;

    return (
      <div
        style={{ position: 'relative' }}
        onMouseEnter={onShowPlay}
        onMouseLeave={onHidePlay}
      >
        <img style={{ width: '210px', height: '100%' }} src={imageMap[content.poster]} alt="" />
        <PlayButtonWrapper>
          <VelocityComponent animation={{ opacity: showPlay ? 1 : 0 }} duration={50}>
            <Link id="content-list-item-link-id" to={{
              pathname: `/content/${content.contentId}`,
              state: content
            }}
            >
              <img
                src="http://wptf.com/wp-content/uploads/2014/05/play-button.png"
                width="80"
                height="80"
                alt=""
              />
            </Link>
          </VelocityComponent>
        </PlayButtonWrapper>
      </div>
    );
  }
}

export default withRouter(ContentThumbnail);
