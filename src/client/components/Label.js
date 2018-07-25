import React from 'react';
import styled from 'styled-components';


const LabelContainer = styled.div`
  padding: 5px;
`;


const Label = ({ text, color }) => (
  <LabelContainer>
    <p style={{color:color || 'inherit'}}>
      {text}
    </p>
  </LabelContainer>
);
export default Label;
