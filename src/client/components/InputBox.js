import React from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';


const InputBoxContainer = styled.div`
 width: 300px;   
 margin: auto;
`;

const InputBox = (props) =>
    <InputBoxContainer>
        <Input
                fullWidth
                id="search"
                placeholder={props.text}
                type="search"
                margin="normal"
                error={props.error}
                onChange={props.onChange}/>
    </InputBoxContainer>;



export default InputBox;