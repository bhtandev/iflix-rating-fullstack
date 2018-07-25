import styled from 'styled-components';

const Button = styled.button`
  display: 'flex';
  justify-content: 'center';
  align-content: 'center';
  margin: 10px 5px 10px;
  background: ${props => props.primary ?  props.primary : 'white' };
  color: ${props => props.primary ? 'white' : props.primary};
  border-radius: ${props => props.borderRadius ? props.borderRadius : '8px'};

  border: 2px solid ${props => props.primary ? props.primary : 'white'};
  height: ${props => props.height ? props.height : '40px'};
  width: ${props => props.width ? props.width : '80px'};;

  cursor: pointer;
  outline: none;
  /*
  &:hover {
    background-color: ${props => props.primary ? props.primary : 'white'}; 
    color: white;
  }
  */
  &:active {
    background-color: 'white'; 
    color: white;
  }
`;

export default Button;
