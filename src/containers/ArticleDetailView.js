import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card } from "antd";

import CustomForm from "../components/Form";

class ArticleDetail extends React.Component {
  state = {
    article: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-type": "application/json",
        Authorization: newProps.token
      };
      const articleID = this.props.match.params.articleID;
      axios
        .get(`https://lucas-beemer.herokuapp.com/api/${articleID}/`)
        .then(res => {
          this.setState({
            article: res.data
          });
        });
    }
  }

  handleDelete = event => {
    if (this.props.token !== null) {
      const articleID = this.props.match.params.articleID;
      axios.defaults.headers = {
        "Content-type": "application/json",
        Authorization: this.props.token
      };
      axios.delete(`https://lucas-beemer.herokuapp.com/api/${articleID}/`);
      this.props.history.push("/");
      this.forceUpdate();
    } else {
      // show some message
    }
  };

  render() {
    return (
      <div>
        <Card title={this.state.article.title}>
          <p>{this.state.article.content}</p>
        </Card>
        <CustomForm
          {...this.props}
          requestType="put"
          articleID={this.props.match.params.articleID}
          btnText="Update"
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleDetail);
