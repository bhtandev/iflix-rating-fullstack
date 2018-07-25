import styled from 'styled-components';

const InputField = styled.input`
  width: 50%; 
  max-width: 500px;
  font-size: 18px;
  border: 2px solid  #E9967A;
  border-radius: 4px;
  line-height: 24px;
  padding: 5px 10px 5px 10px;
  height: 25px;
  position: relative;
  
  &:focus {
    outline: none;
  }
`;

export default InputField;