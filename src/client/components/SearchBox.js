import React, { Component } from 'react';
import Button from './Button';
import InputField from './InputField';

import styled from 'styled-components';

const SearchInputBox = styled.div`
  align-items: center;
  position: relative;
  box-sizing: border-box;
  margin: 0;
`;

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            typingTimeout: undefined,
            inputError: false,
            inputText: ''
        };
    }

    handleTextChange = (e) => {

        const { doSearch, noSubmitButton, minLengthRequired} = this.props;

        const searchText = e.currentTarget.value;

        this.setState({ text: searchText });

        if (noSubmitButton === true) {

            console.log('typing->', searchText);

            const {typingTimeout} = this.state;

            clearTimeout(typingTimeout);

            this.setState({
                typingTimeout: setTimeout(() => {
                    if (searchText == '' || searchText.length >= minLengthRequired) {
                        this.setState({
                            inputError: false,
                            inputText: ''
                        });

                        if (searchText.length >= minLengthRequired) {
                            doSearch(searchText);
                        }
                    } else {
                        this.setState({
                            inputError: true,
                            inputText: 'Minimum 2 characters required!'
                        });
                    }
                }, 1000)
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {doSearch} = this.props;

        if (doSearch) {
            doSearch(this.state.text);
        }
    };

    render() {
        const { status, noSubmitButton } = this.props;
        const { inputText, inputError } = this.state;

        const statusTextColor = (inputError || status.type ==='ERROR')? 'red' : 'black';

        return (
            <SearchInputBox >
                <InputField
                    id="search-box-input"
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                {!noSubmitButton &&
                <Button id="search-box-button" onClick={this.handleSubmit}>
                    Search
                </Button>
                }
                <div id="search-box-status" style={{margin: '5px', color: statusTextColor}}>
                    {inputText? inputText : status.text}
                </div>
            </SearchInputBox>
        );
    }
}

export default SearchBox;