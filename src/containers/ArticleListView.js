import React from "react";
import axios from "axios";
import { connect } from "react-redux";

// COMPONENTS
import Articles from "../components/Article";
import CustomForm from "../components/Form";

class ArticleList extends React.Component {
  state = {
    articles: []
  };

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-type": "application/json",
        Authorization: newProps.token
      };
      axios.get("https://lucas-beemer.herokuapp.com/api/").then(res => {
        this.setState({
          articles: res.data
        });
        this.props.history.push("/");
      });
    }
  }

  render() {
    return (
      <div>
        <Articles data={this.state.articles} />
        <br />
        <h2>Create a post</h2>
        <CustomForm requestType="post" articleID={null} btnText="Create" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleList);
