import React, {Component} from 'react';
import Modal from '../../../components/Modal';
import H1Text from '../../../components/Title';
import Label from '../../../components/Label';
import StarRatings from 'react-star-ratings';
import Button from '../../../components/Button';
import SpinLoader from '../../../components/SpinLoader';

import styled from 'styled-components';

const ModalContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px 0px 10px;
  color: black;
`;

const ModalButtonBox = styled.div`
  display: flex; 
  justify-content: flex-end; 
  width: 100%;
  margin-bottom: 15px;
`;

class RateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRatingValue: 0,
      notification: '',
      justRated: false,
      ratingInProgress: false,
    }
  }

  changeRating = (value) => {
    console.log('new rating', value);
    this.setState({
      newRatingValue: value
    })
  };

  onOKClick = () => {
    const {onOK} = this.props;

    if (this.state.newRatingValue === 0) {
      this.setState({
        notification: 'Minimum 1 star required to rate!'
      })
    } else {


      this.setState({
        ratingInProgress: true,
        justRated: false,
      });

      onOK(this.state.newRatingValue).then((content)=> {
        console.log('content return', content);
        this.setState({
          notification: 'Rating successful!',
          ratingInProgress: false,
          justRated: true,
        })
      }).catch(error => {
        this.setState({
          notification: 'Error submitting rating!',
          ratingInProgress: false,
        })
      })
    }
  };

  onCancelClick = () => {
    const {onClose} = this.props;
    this.setState({
      newRatingValue: 0,
      notification: '',
    });

    onClose();
  };

  render() {
    const {
      isModalOpen, onClose, averageRate, alreadyRated
    } = this.props;

    const primaryColor = '#ED1D23';

    const rated = alreadyRated || this.state.justRated;

    return (
      <Modal style={{borderRadius: '8px', position: 'fixed'}} width="320" height="350" isOpen={isModalOpen}
             onClose={onClose}>
        <ModalContentBox>
          <H1Text>Rate the Movie!</H1Text>
          <div style={{height: '100px'}}>
            {rated &&
            <div>
              <Label text={alreadyRated? 'Looks like you have already gave your rating.' : 'Thank you for rating!'}/>
              <Label text={`Average Rating ${(averageRate > 0) ? `: ${averageRate.toFixed(2)}` : ''}`}/>
            </div>
            }
            {
              !(rated) &&
              <div>
                <Label text="Hope you enjoyed the movie!"/>
                <Label text="How about rating the movie, then?"/>
                <Label color="red" text={this.state.notification}/>
              </div>
            }
          </div>
          <div style={{height: '35px'}}>
            {
              this.state.ratingInProgress &&
              <SpinLoader color={primaryColor}></SpinLoader>
            }
          </div>
          <div style={{height: '60px', marginTop: '20px'}}>
            {
              rated &&
              <StarRatings
                rating={averageRate}
                starRatedColor={primaryColor}
                starDimension="36px"
                starSpacing="1px"/>
            }
            {
              !rated &&
              <StarRatings
                changeRating={this.changeRating}
                rating={this.state.newRatingValue}
                starRatedColor={primaryColor}
                starDimension="36px"
                starSpacing="1px"/>
            }
          </div>
          <ModalButtonBox>
            {!rated &&
            <Button primary={primaryColor} onClick={this.onOKClick}>OK</Button>
            }
            <Button primary={primaryColor} onClick={this.onCancelClick}>{rated? 'Close' : 'Cancel'}</Button>
          </ModalButtonBox>
        </ModalContentBox>
      </Modal>)
  }
}

export default RateModal;
