import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { VelocityComponent } from 'velocity-react';
import Title from '../../../components/Title';
import './content.css';
import { getCurrentUser } from '../../Users/UserReducer';
import {fetchContent} from "../ContentActions";
import {fetchRatingUsingContentIdAndUserId, postRating} from "../../Ratings/RatingActions";

import RateModal from "../components/RateModal";

import Button from "../../../components/Button";

const ProgressContainer = styled.div`
  width: 100%;
`;

const Progress = styled.div`
  padding: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
`;

const ProgressBar = styled.div`
  width: 1px;
  height: 16px;
  border-radius: 4px;
  background-color: firebrick;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
`;

const ContentPageBox = styled.div`
  display: flex; 
  flex-direction: column;
  color: #F5FAFC;
`;

const ContentHeaderBox = styled.div`
  display: flex; 
  justify-content: space-between;
  margin: 20px
`;

export class ContentScene extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false,
      isModalOpen: false,
      alreadyRated: false,
    };
  }

  componentDidMount() {
    setTimeout(this.setState({ loaded: true }), 3500);
  }

  /**
   * Checks if rating before and passes on info to
   * modal to show rated or not yet.
   * @param userId
   * @param contentId
   * @param onRateModalOpen
   */
  onRateModalOpen = (contentId) => {
    const { dispatch, currentUser } = this.props;
    return new Promise( (resolve, reject) => {
      dispatch(fetchRatingUsingContentIdAndUserId(currentUser._id, contentId)).then((rating) => {
        resolve(rating);
      }).catch(err => reject(err))
    });
  };

  onRateModalOK = (rating) => {
    const { dispatch, currentUser } = this.props;
    const { contentId } = this.props.location.state;

    return new Promise( (resolve, reject) => {
      dispatch(postRating(currentUser._id, contentId, rating)).then((ratingObj)=> {
        dispatch(fetchContent(contentId)).then((content)=> resolve(content));
      }).catch(err => reject(err))
    });
  };

  onLoadingComplete = () => {
    const { contentId } = this.props.location.state;
    const { currentUser } = this.props;
    const userId = currentUser._id;

    this.openModal(userId, contentId);
};

  openModal = (userId, contentId) => {
    this.onRateModalOpen(contentId).then((rating) => {
      this.setState({isModalOpen: true, alreadyRated: (rating.length > 0)})
    });
  };

  closeModal = () => {
    this.setState({isModalOpen: false})
  };

  goBack= () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { title, rateCount, rateValue } = this.props.location.state;
    const averageRateScore = (rateCount && rateValue) ? rateValue / rateCount : 0;

    return (
      <ContentPageBox>
        <ContentHeaderBox style={{ display: 'flex', justifyContent: 'space-between', margin: '20px'}}>
          <Title>
            {title}
          </Title>
          <Button onClick={this.goBack}>Go Back</Button>
        </ContentHeaderBox>
        <div className="movie-scene"/>
        <ProgressContainer>
          <Progress>
            <VelocityComponent animation={{ width: this.state.loaded ? '100%' : '1%' }}
                               duration={3000}
                               complete={this.onLoadingComplete}>
              <ProgressBar />
            </VelocityComponent>
          </Progress>
        </ProgressContainer>
        <RateModal
          isModalOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()}
          averageRate={averageRateScore}
          textLines={['Enjoyed the movie?', 'How about rating the movie, then?']}
          alreadyRated={this.state.alreadyRated}
          onOK={this.onRateModalOK}/>
      </ContentPageBox>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state),
  };
}

export default connect(mapStateToProps)(ContentScene);
