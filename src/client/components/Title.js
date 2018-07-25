import styled from 'styled-components';
import {HEADER_HEIGHT} from "./Header";

const Title = styled.h1`
  padding: 10px;
  color: ${props => props.color? props.color: 'black'},
`;

export default Title;