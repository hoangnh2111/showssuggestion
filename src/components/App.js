import React, { Component } from "react";
import "./index.css";
import Popup from "./Popup";
import Modal from "react-responsive-modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      keyStorage: []
    };
  }
  /* <----------------Open/Close Modal Functions --------------> */
  onOpenModal = data => {
    this.setState({
      open: true,
      keyStorage: data
    });
  };
  onCloseModal = () => {
    this.setState({
      open: false
    });
  };
  onCloseMainModal = () => {
    this.onCloseModal();
  };

  /* <----------------Render Function--------------------------> */

  render() {
    window.onOpenModal = this.onOpenModal;
    const { open, keyStorage } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal}>
          <Popup
            onCloseMainModal={this.onCloseMainModal}
            keyStorage={keyStorage}
          />
        </Modal>
      </div>
    );
  }
}
export default App;
