import React, { Component } from "react";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      image: "",
      url: ""
    };
  }
  /* <------------------ Get Data from LocalStorage ------------------> */

  componentWillMount() {
    if (this.props.item) {
      this.setState({
        id: this.props.item.id,
        title: this.props.item.title,
        image: this.props.item.image,
        url: this.props.item.url
      });
    }
  }
  /* <----------------------------------------------------------------> */

  /* <------------------------- Form Functions ------------------------> */

  onChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      title: "",
      image: "",
      url: ""
    });
  };
  /* <-----------------------------------------------------------------> */

  /* <---------------------------- Render -----------------------------> */

  render() {
    const { title, url, image } = this.state;
    const { item } = this.props;
    var text = item ? "Chỉnh sửa" : "Thêm mới";
    return (
      <div className="formEditing">
        <h2 style={{ color: "#b3aca7" }}> {text} </h2>
        <form id="form" className="topBefore" onSubmit={this.onSubmit}>
          <input
            name="title"
            onChange={this.onChange}
            value={title}
            type="text"
            placeholder="TIÊU ĐỀ"
          />
          <input
            name="image"
            onChange={this.onChange}
            value={image}
            type="text"
            placeholder="LINK ẢNH"
          />
          <input
            name="url"
            onChange={this.onChange}
            value={url}
            type="text"
            placeholder="LINK BÀI VIẾT"
          />
          <div className="controlForm">
            <input id="submit" type="submit" defaultValue="LƯU" />
            <a className="cancelButton" onClick={this.props.onCloseModal}>
              {" "}
              Hủy{" "}
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
