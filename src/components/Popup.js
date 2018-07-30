import React, { Component } from "react";
import Form from "./Form";
import Modal from "react-responsive-modal";
import Sortable from "react-sortablejs";
import { EMLINK } from "constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      item: null
    };
  }

  /* <----------------Open/Close Modal Function --------------> */
  onOpenModal = () => {
    this.setState({
      item: null,
      open: true
    });
  };

  onCloseModal = () => {
    this.setState({
      open: false,
      item: null
    });
  };
  onCloseMainModal = () => {
    this.setState({
      open: false
    });
    this.props.onCloseMainModal(this.state);
  };
  /*  <--------------------------------------------------------> */

  /*  <------------- Generate random ID function --------------> */
  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  guid = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  };
  /*  <----------------------------------------------------------> */

  /*  <------------------ Save Data function -------------------> */
  onSaveData = () => {
    var data = this.state.data;
    localStorage.setItem(this.props.keyStorage, JSON.stringify(data));
    this.onCloseMainModal();
  };
  /* <-----------------------------------------------------------> */

  /* <----------------- Get Data from LocalStorage ---------------> */
  componentWillMount() {
    if (localStorage && localStorage.getItem(this.props.keyStorage)) {
      var data = JSON.parse(localStorage.getItem(this.props.keyStorage));
      this.setState({
        data: data
      });
    } else {
      console.log("No Data Storage !");
    }
  }
  /* <-------------------------------------------------------------> */

  /*<--------------------- Submit Form Function ---------------------> */
  onSubmit = data => {
    var list = this.state.data;
    /*   <--Check Edit or Add item  --> */
    if (data.id) {
      var index = list.findIndex(x=>x.id===data.id) 
      if (index !== -1) {
        list[index] = {
          id: data.id,
          title: data.title,
          image: data.image,
          url: data.url
        };
      }

    } 
    else {
      //-- Add Item into List at first position
      var newData = {
        id: this.guid(),
        title: data.title,
        image: data.image,
        url: data.url
      };
      list.unshift(newData);
    }
    this.setState({
      data: list,
      item: null,
      open: false
    });
  };
  /*<------------------------------------------------------------------> */

  /*<--------------------Edit Function---------------------------------> */
  onEditHandle = item => {
    this.setState({
      open: true,
      item: item
    });
  };
  /*  <-----------------------------------------------------------------> */

  /*--------------------------Delete Function -------------------------->*/
  onDeleteHandle = id => {
    var list = this.state.data;
    var index = list.findIndex(x=>x.id===id) 
    list.splice(index, 1);
    this.setState({
      data: list
    });
  };
  /*---------------------------------------------------------------------*/

  render() {
    /* -------------------------------- Sortable List  ----------------------------- */
    const SortableList = ({ items }) => {
      let sortable = null; // sortable instance
      const listItems = items.map((val, index) => (
        <div key={`item-${index}`} data-id={val.id} className="card-image-2">
          <img
            style={{ width: "163px", height: "90px", padding: "5px" }}
            src={val.image}
            alt="images"
          />
          <div className="button-inline">
            <a className="cardButton" onClick={() => this.onEditHandle(val)}>
              Sửa
            </a>
            <a
              className="cardButton"
              onClick={() => this.onDeleteHandle(val.id)}
            >
              Xóa
            </a>
          </div>
        </div>
      ));

      return (
        <Sortable
          options={{
            animation: 250,
            filter: ".cardButton",
            group: "localStorage-example",
            store: {
              get: function(sortable) {
                var order = localStorage.getItem(sortable.options.group.name);
                return order ? order.split("|") : [];
              },
              set: function(sortable) {
                var order = sortable.toArray();
                localStorage.setItem(
                  sortable.options.group.name,
                  order.join("|")
                );
              }
            }
          }}
          ref={c => {
            if (c) {
              sortable = c.sortable;
            }
          }}
        >
          {listItems}
        </Sortable>
      );
    };
    /* ---------------------------- Sortable List ---------------------------------- */

    /* ------------------------- Render Sortable List and Form  -------------------- */
    var { data, open, item } = this.state;
    return (
      <div>
        <div className="modal">
          <div className="head">
            <a className="btn-close trigger" onClick={this.onCloseMainModal} />
            <h3> Quản lý Ảnh gợi ý </h3>
            <a className="button addButton" onClick={this.onOpenModal}>
              Thêm mới
            </a>
          </div>
          <div className="content">
            <SortableList items={data} />
            <Modal open={open} onClose={this.onCloseModal} center>
              <Form
                onSubmit={this.onSubmit}
                item={item}
                onCloseModal={this.onCloseModal}
              />
            </Modal>
          </div>
          <div className="saveButton">
            <a className="button special" onClick={this.onSaveData}>
              Lưu
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
