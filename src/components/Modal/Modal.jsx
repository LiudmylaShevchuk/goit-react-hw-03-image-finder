import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

    render() {
    const { largeImageURL } = this.props.image;          
    return createPortal(
      <div className="Overlay" onClick={this.onOverlayClose} >
            <div className="Modal">
                <img src={largeImageURL} alt="img" />
            </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;


