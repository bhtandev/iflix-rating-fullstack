import React, { Component } from 'react';

// https://peteris.rocks/blog/modal-window-in-react-from-scratch/

class Modal extends Component {
  render() {
    if (this.props.isOpen === false) return null;

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    };

    if (this.props.width && this.props.height) {
      modalStyle.width = `${this.props.width}px`;
      modalStyle.height = `${this.props.height}px`;
      modalStyle.marginLeft = `-${this.props.width / 2}px`,
      modalStyle.marginTop = `-${this.props.height / 2}px`,
      modalStyle.transform = null;
    }

    if (this.props.style) {
      for (const key in this.props.style) {
        modalStyle[key] = this.props.style[key];
      }
    }

    const backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    };

    if (this.props.backdropStyle) {
      for (const key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key];
      }
    }

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop
        && (
        <div
          className={this.props.backdropClassName}
          style={backdropStyle}
          onClick={e => this.close(e)}
        />
        )}
      </div>
    );
  }

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default Modal;