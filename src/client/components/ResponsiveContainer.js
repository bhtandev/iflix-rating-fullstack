import styled from 'styled-components';
import { device } from './device';
import { HEADER_HEIGHT } from './Header';
// margin: auto;

const ResponsiveContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column; 
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: ${HEADER_HEIGHT}
  
  /*
  @media ${device.laptop} {
    max-width: 1000px;   
  }
    
  @media ${device.desktop} {
    max-width: 1200px;
  }
  */
  
  

`;



export default ResponsiveContainer;
