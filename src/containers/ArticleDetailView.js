import React from "react";
import axios from "axios";

import { Button, Card } from "antd";
import CustomForm from "../components/Form";

class ArticleDetail extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    const articleID = this.props.match.params.articleID;
    axios
      .get(`https://lucas-beemer.herokuapp.com/api/${articleID}/`)
      .then(res => {
        this.setState({
          article: res.data
        });
      });
  }

  handleDelete = event => {
    event.preventDefault();
    const articleID = this.props.match.params.articleID;
    axios
      .delete(`https://lucas-beemer.herokuapp.com/api/${articleID}/`)
      .then(res => {
        if (res.status === 204) {
          this.props.history.push("/");
        }
      });
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

export default ArticleDetail;
