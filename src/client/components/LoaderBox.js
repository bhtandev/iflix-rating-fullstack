import React from 'react';
import styled from 'styled-components';

const LoaderPage = styled.div`
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: white;
    z-index: 50;
`;

const CenterLoader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 55;
`;

const LoaderBox = (props) => (
    <LoaderPage>
        <CenterLoader>
            {props.children}
        </CenterLoader>
    </LoaderPage>
);


export default LoaderBox;


