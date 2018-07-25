import React, {Component} from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import Button from '../../../components/Button';
import RateModal from "./RateModal";
import ContentThumbnail from "./ContentThumbnail";

const Well = styled.div`
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  
  background-color: rgba(0,0,0,0.6);
  border: 1px solid #e8e8e8;
  border-radius: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
`;

const ContentTitle = styled.div`
  padding: 10px 0 10px 0;
  color: #F5FAFC;;
  vertical-align: top;
  max-width: 200px;
  max-height: 80px;
  text-align: center;
`;

const ContentRatingBox = styled.div`
  display: flex; 
  justify-content: space-around; 
  align-items: center; 
  width: 100%;
`;

class ContentListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlay: false,
      isModalOpen: false,
      alreadyRated: false,
    }
  }

  showPlay = () => {
    const {onContentHover, title, releaseDate} = this.props;

    if (onContentHover) {
      onContentHover({title, releaseDate})
    }

    this.setState({
      showPlay: true
    });
  };

  hidePlay = () => {
    this.setState({
      showPlay: false
    });
  };

  /**
   * Calls back parent function because parent is connected to Redux.
   * Parent function checks if rating before and passes on info to
   * modal to show rated or not yet.
   * @param userId
   * @param contentId
   * @param onRateModalOpen
   */
  openModal = (userId, contentId, onRateModalOpen) => {
    onRateModalOpen(contentId).then((rating) => {
      this.setState({isModalOpen: true, alreadyRated: (rating.length > 0)})
    });
  };

  openRateModal = () => {
    const { _id, currentUser, onRateModalOpen } = this.props;
    const contentId = _id;
    const userId = currentUser._id;

    this.openModal(userId, contentId, onRateModalOpen);
  };

  rateModalOnOK = (rating) => {
    const { onRateModalOK, _id } = this.props;
    const contentId = _id;

    return onRateModalOK(contentId, rating);
  };

  rateModalOnClose = () => {
    this.setState({isModalOpen: false});
  };

  render() {
    const { title, poster, releaseDate, rateCount, rateValue, _id } = this.props;

    const contentId = _id;
    const primaryColor = '#ED1D23';

    const averageRateScore = (rateCount && rateValue) ? rateValue / rateCount : 0;

    return (
      <div id="content-list-item" style={{padding: '10px'}}>
        <Well>
          <ContentThumbnail id="content-list-item-thumbnail-select"
            onShowPlay={this.showPlay}
            onHidePlay={this.hidePlay}
            showPlay={this.state.showPlay}
            content={{title, poster, releaseDate, contentId, rateCount, rateValue}}
          />
          <ContentTitle id="content-list-item-title">
            {title}
          </ContentTitle>
          <RateModal id="content-list-item-rate-modal"
            isModalOpen={this.state.isModalOpen}
            onClose={this.rateModalOnClose}
            averageRate={averageRateScore}
            alreadyRated={this.state.alreadyRated}
            onOK={this.rateModalOnOK}/>
          <ContentRatingBox>
              <StarRatings id="content-list-item-avg-rating"
                isSelectable={false}
                rating={averageRateScore}
                starRatedColor={primaryColor}
                starDimension="18px"
                starSpacing="1px"/>
              <Button width="50px" height="25px" primary={primaryColor} id="rate-modal-open-button"
                    onClick={this.openRateModal}>Rate</Button>
          </ContentRatingBox>
        </Well>
      </div>
    );
  }
};

export default ContentListItem;
