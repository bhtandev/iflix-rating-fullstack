import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import styled from 'styled-components';

import { fetchUsers, setCurrentUser } from '../Users/UserActions';
import { getUsers, getCurrentUser } from '../Users/UserReducer';

import Dropdown from 'react-dropdown'
import ResponsiveContainer from '../../components/ResponsiveContainer';
import FixedHeader from '../../components/FixedHeader';
import Title from '../../components/Title';
import ContentsPage from '../Contents/pages/ContentsPage';
import ContentPage from '../Contents/pages/ContentPage';

import 'react-dropdown/style.css'
import './App.css';

const AppBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-item: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    users: PropTypes.array,
    currentUser: PropTypes.object,
  };

  componentDidMount(){
    this.getAllUsers();
  }

  /**
   * Fetches users when component mounts. This also checks
   * if injected version is supplied.
   * Injectable option for test stubbing.
   */
  getAllUsers = () => {
    const { dispatch, getAllUsers } = this.props;

    if (!getAllUsers) {
      dispatch(fetchUsers());
    } else {
      getAllUsers();
    }
  };

  onDropdownMenuSelect = (option) => {
    const { dispatch } = this.props;
    dispatch(setCurrentUser(option.value));
  };

  render() {
    const { users, history, currentUser } = this.props;

    const options = users? users.map((user)=> {
      return {
        value: user._id,
        label: user.username,
      };
    }) : [];

    // console.log('currentUser', currentUser);

    const defaultOption = (users && users.length)? options.filter(option => option.value === currentUser._id)[0] : [];

    return (
      <AppContainer id="app">
        <FixedHeader id="app-bar" color="#ED1D23">
          <AppBar>
            <Title style={{ cursor: 'pointer'}}  id="app-title" onClick={() => {history.push('/')}}>
              iflix
            </Title>
            {(options.length > 1) &&
            < Dropdown id="user-dropdown" className="username-dropdown"
              options={options}
              onChange={this.onDropdownMenuSelect}
              value={defaultOption}
              placeholder="Users" />
            }
          </AppBar>
        </FixedHeader>
        <ResponsiveContainer id="app-body">
          <Switch>
            <Route path='/content/:id' component={ContentPage}/>
            <Route exact path='/' render={(urlParams) =><ContentsPage {...urlParams} getAllContents={this.props.getAllContents}/>}/>
          </Switch>
        </ResponsiveContainer>
      </AppContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: getUsers(state),
    currentUser: getCurrentUser(state)
  }
}

export default connect(mapStateToProps)(App);
