import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {fetchContents, fetchContent} from '../ContentActions';
import {getContents, getError} from '../ContentReducer';
import {getCurrentUser} from '../../Users/UserReducer';
import {fetchRatingUsingContentIdAndUserId, postRating} from '../../Ratings/RatingActions';

import Title from '../../../components/Title';

import ContentList from '../components/ContentList';
import './content.css';

export class ContentsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    contents: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      status: {
        text: '',
        type: 'notification'
      },
      contentName: `Welcome back ${props.currentUser? props.currentUser.username : ''}!` ,
      contentYear: ''
    }
  }

  componentDidMount(){
    this.getAllContents();
  }

  getAllContents = () => {
    const { dispatch, getAllContents } = this.props;

    if (!getAllContents) {
      dispatch(fetchContents()).catch((error)=> {

        this.setState({
          contentName: 'Error loading content! Service down.'
        })

      })
    } else {
      getAllContents();
    }
  };

  onContentHover = (movieInfo) => {
    const {title, releaseDate} = movieInfo;
    this.setState({
      contentName: title,
      contentYear: releaseDate,
    });
  };

  onRateModalOpen = (contentId) => {
    const {dispatch, currentUser} = this.props;
    return new Promise((resolve, reject) => {
      dispatch(fetchRatingUsingContentIdAndUserId(currentUser._id, contentId)).then((rating) => {
        resolve(rating);
      }).catch(err => reject(err))
    });
  };

  onRateModalOK = (contentId, rating) => {
    const {dispatch, currentUser} = this.props;
    return new Promise((resolve, reject) => {
      dispatch(postRating(currentUser._id, contentId, rating)).then((ratingObj) => {
        dispatch(fetchContent(contentId)).then((content)=> {
          resolve(content);
        })
      }).catch(err => reject(err))
    });
  };

  render() {
    const {contents, currentUser} = this.props;

    return contents? (
      <div style={{display: 'flex', flexDirection: 'column', color: '#F5FAFC', justifyContent: 'space-around',   height: '100%'
      }}>
        <div>
          <Title id="content-title">
            {this.state.contentName}
          </Title>
          <div className="content-title-box">
            <h2>
              {this.state.contentYear && moment(this.state.contentYear).format('MMMM YYYY')}
            </h2>
          </div>
        </div>
        <ContentList onContentHover={this.onContentHover}
                   onRateModalOpen={this.onRateModalOpen}
                   onRateModalOK={this.onRateModalOK}
                   currentUser={currentUser}
                   contents={contents}>
        </ContentList>
      </div>
    ) : null;
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    contents: getContents(state), //TODO: reselect,
    currentUser: getCurrentUser(state),
  };
}

export default connect(mapStateToProps)(ContentsPage);

