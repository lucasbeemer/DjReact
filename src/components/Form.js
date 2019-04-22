import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const FormItem = Form.Item;

class CustomForm extends React.Component {
  handleFormSubmit = (event, requestType, articleID) => {
    const title = event.target.elements.title.value;
    const date = event.target.elements.date.value;
    const content = event.target.elements.content.value;

    switch (requestType) {
      case "post":
        return axios
          .post("https://lucas-beemer.herokuapp.com/api/", {
            title: title,
            date: date,
            content: content
          })
          .then(res => console.log(res))
          .catch(error => console.log(error));
      case "put":
        return axios
          .put(`https://lucas-beemer.herokuapp.com/api/${articleID}/`, {
            title: title,
            date: date,
            content: content
          })
          .then(res => console.log(res))
          .catch(error => console.log(error));
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
        >
          <FormItem label="Title">
            <Input name="title" placeholder="input title" />
          </FormItem>
          <FormItem label="Content">
            <Input name="content" placeholder="input content" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
