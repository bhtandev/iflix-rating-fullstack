import React, {Component} from 'react';
import style from 'styled-components';
import 'velocity-animate';

const HorizontalScrollContainer = style.section`
  display: flex;
  justify-content: ${props =>props.justifyContent? props.justifyContent : 'flex-start'}
  min-height: 50px;
  overflow-x: auto;
  padding-left: 20px;
  padding-right: 20px;
  margin: 10 10 0 10;
  &:scrollbar {
    display: none;
  }
`;

const TransparentButton = style.button`
  position: ${props => props.position ? props.position : 'static'};
  background-color: rgba(0,0,0,0.6);
  height: 100%;
  z-index: 999;
`;

class HorizontalScoll extends Component {
    constructor(props) {
        super(props);

        this.horizontalScroller = React.createRef();
    }

    scrollRight = () => this.scrollClick('right');

    scrollLeft = () => this.scrollClick('left');

    scrollClick = (direction) => {
        this.currentValue = this.horizontalScroller.current.scrollLeft;

        const offset = (direction === 'right') ? 250 : -250;

        this.horizontalScroller.current.velocity({
            scrollLeft: `${this.currentValue + offset}px`
        }, {
          duration: 500,
          easing: "easeInSine",
        });
    };

    render() {
        let scrollWidth, offsetWidth;

        if (this.horizontalScroller && this.horizontalScroller.current) {
            scrollWidth = this.horizontalScroller.current.scrollWidth;
            offsetWidth = this.horizontalScroller.current.offsetWidth;
        }

        return (this.props.children.length > 0)? (
            <div style={{position: 'relative', width: '100%'}}>
                <TransparentButton position="absolute" style={{
                    top: 0, left: 0, border: 0, outline:'none'
                }} onClick={this.scrollLeft}>
                  {/*<img*/}
                    {/*src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ0NC41MzEgNDQ0LjUzMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjUzMSA0NDQuNTMxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTIxMy4xMywyMjIuNDA5TDM1MS44OCw4My42NTNjNy4wNS03LjA0MywxMC41NjctMTUuNjU3LDEwLjU2Ny0yNS44NDFjMC0xMC4xODMtMy41MTgtMTguNzkzLTEwLjU2Ny0yNS44MzUgICBsLTIxLjQwOS0yMS40MTZDMzIzLjQzMiwzLjUyMSwzMTQuODE3LDAsMzA0LjYzNywwcy0xOC43OTEsMy41MjEtMjUuODQxLDEwLjU2MUw5Mi42NDksMTk2LjQyNSAgIGMtNy4wNDQsNy4wNDMtMTAuNTY2LDE1LjY1Ni0xMC41NjYsMjUuODQxczMuNTIxLDE4Ljc5MSwxMC41NjYsMjUuODM3bDE4Ni4xNDYsMTg1Ljg2NGM3LjA1LDcuMDQzLDE1LjY2LDEwLjU2NCwyNS44NDEsMTAuNTY0ICAgczE4Ljc5NS0zLjUyMSwyNS44MzQtMTAuNTY0bDIxLjQwOS0yMS40MTJjNy4wNS03LjAzOSwxMC41NjctMTUuNjA0LDEwLjU2Ny0yNS42OTdjMC0xMC4wODUtMy41MTgtMTguNzQ2LTEwLjU2Ny0yNS45NzggICBMMjEzLjEzLDIyMi40MDl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="/>*/}
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ0NC41MzEgNDQ0LjUzMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjUzMSA0NDQuNTMxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTIxMy4xMywyMjIuNDA5TDM1MS44OCw4My42NTNjNy4wNS03LjA0MywxMC41NjctMTUuNjU3LDEwLjU2Ny0yNS44NDFjMC0xMC4xODMtMy41MTgtMTguNzkzLTEwLjU2Ny0yNS44MzUgICBsLTIxLjQwOS0yMS40MTZDMzIzLjQzMiwzLjUyMSwzMTQuODE3LDAsMzA0LjYzNywwcy0xOC43OTEsMy41MjEtMjUuODQxLDEwLjU2MUw5Mi42NDksMTk2LjQyNSAgIGMtNy4wNDQsNy4wNDMtMTAuNTY2LDE1LjY1Ni0xMC41NjYsMjUuODQxczMuNTIxLDE4Ljc5MSwxMC41NjYsMjUuODM3bDE4Ni4xNDYsMTg1Ljg2NGM3LjA1LDcuMDQzLDE1LjY2LDEwLjU2NCwyNS44NDEsMTAuNTY0ICAgczE4Ljc5NS0zLjUyMSwyNS44MzQtMTAuNTY0bDIxLjQwOS0yMS40MTJjNy4wNS03LjAzOSwxMC41NjctMTUuNjA0LDEwLjU2Ny0yNS42OTdjMC0xMC4wODUtMy41MTgtMTguNzQ2LTEwLjU2Ny0yNS45NzggICBMMjEzLjEzLDIyMi40MDl6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                </TransparentButton>
                <HorizontalScrollContainer innerRef={this.horizontalScroller}>
                    {this.props.children}
                </HorizontalScrollContainer>
                <TransparentButton position="absolute" style={{
                    top: 0, right: 0, border: 0,outline:'none'
                }} onClick={this.scrollRight}>
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM1Mi4wMjUsMTk2LjcxMkwxNjUuODg0LDEwLjg0OEMxNTkuMDI5LDMuNjE1LDE1MC40NjksMCwxNDAuMTg3LDBjLTEwLjI4MiwwLTE4Ljg0MiwzLjYxOS0yNS42OTcsMTAuODQ4TDkyLjc5MiwzMi4yNjQgICBjLTcuMDQ0LDcuMDQzLTEwLjU2NiwxNS42MDQtMTAuNTY2LDI1LjY5MmMwLDkuODk3LDMuNTIxLDE4LjU2LDEwLjU2NiwyNS45ODFsMTM4Ljc1MywxMzguNDczTDkyLjc4NiwzNjEuMTY4ICAgYy03LjA0Miw3LjA0My0xMC41NjQsMTUuNjA0LTEwLjU2NCwyNS42OTNjMCw5Ljg5NiwzLjUyMSwxOC41NjIsMTAuNTY0LDI1Ljk4bDIxLjcsMjEuNDEzICAgYzcuMDQzLDcuMDQzLDE1LjYxMiwxMC41NjQsMjUuNjk3LDEwLjU2NGMxMC4wODksMCwxOC42NTYtMy41MjEsMjUuNjk3LTEwLjU2NGwxODYuMTQ1LTE4NS44NjQgICBjNy4wNDYtNy40MjMsMTAuNTcxLTE2LjA4NCwxMC41NzEtMjUuOTgxQzM2Mi41OTcsMjEyLjMyMSwzNTkuMDcxLDIwMy43NTUsMzUyLjAyNSwxOTYuNzEyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                  {/*<img*/}
                    {/*src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM1Mi4wMjUsMTk2LjcxMkwxNjUuODg0LDEwLjg0OEMxNTkuMDI5LDMuNjE1LDE1MC40NjksMCwxNDAuMTg3LDBjLTEwLjI4MiwwLTE4Ljg0MiwzLjYxOS0yNS42OTcsMTAuODQ4TDkyLjc5MiwzMi4yNjQgICBjLTcuMDQ0LDcuMDQzLTEwLjU2NiwxNS42MDQtMTAuNTY2LDI1LjY5MmMwLDkuODk3LDMuNTIxLDE4LjU2LDEwLjU2NiwyNS45ODFsMTM4Ljc1MywxMzguNDczTDkyLjc4NiwzNjEuMTY4ICAgYy03LjA0Miw3LjA0My0xMC41NjQsMTUuNjA0LTEwLjU2NCwyNS42OTNjMCw5Ljg5NiwzLjUyMSwxOC41NjIsMTAuNTY0LDI1Ljk4bDIxLjcsMjEuNDEzICAgYzcuMDQzLDcuMDQzLDE1LjYxMiwxMC41NjQsMjUuNjk3LDEwLjU2NGMxMC4wODksMCwxOC42NTYtMy41MjEsMjUuNjk3LTEwLjU2NGwxODYuMTQ1LTE4NS44NjQgICBjNy4wNDYtNy40MjMsMTAuNTcxLTE2LjA4NCwxMC41NzEtMjUuOTgxQzM2Mi41OTcsMjEyLjMyMSwzNTkuMDcxLDIwMy43NTUsMzUyLjAyNSwxOTYuNzEyeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/>*/}
                </TransparentButton>
            </div>
        ) : null;
    }
}

export default HorizontalScoll;
