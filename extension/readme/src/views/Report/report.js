import React, { Component } from "react";
import {
  Formik,
  Form,
  ErrorMessage,
} from "formik";
import { Alert, Spinner } from "react-bootstrap";
import {  Redirect } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader

import { newReport } from "../../network/lib/article";
import { articleStorage, userStorage } from "../../chromeHelper";


const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasArticle: undefined,
      tags: [],
      rating_st: "",
      fake_st: "",
      isSuccess: false,
    };
    articleStorage.get((article) => {
      this.state.hasArticle = article;
    });
  }
 
  render() {
    if (this.state.hasArticle)
      return (
        <div>
          {" "}
          {this.state.hasArticle === "noArticle" ? (
            <Alert variant="info"> No Article </Alert>
          ) : (
            <Formik
              initialValues={{
                type: "report",
                id: "123",
                tags: [],
                fake_st: "true",
                rating_st: "1",
              }}
              onSubmit={(values, { setSubmitting }) => {
                var ids = { articleid: "", userid: "" };
                var values_to_send = { fake: "", rating: "", labels: [] };

                articleStorage.get((article) => {
                  ids["articleid"] = article.id;
                  console.log(article);
                });
                userStorage.get((user) => {
                  ids["userid"] = user.userId;
                });
                if (values["fake_st"] == "true") {
                  values_to_send["fake"] = true;
                }
                if (values["fake_st"] == "false") {
                  values_to_send["fake"] = false;
                }
                values_to_send["rating"] = parseInt(values.rating_st, 10);
                // handle labels
                values_to_send["labels"] = values["tags"];
                console.log(values_to_send);
                sleep(1000).then(() => {
                  var data = Object.assign({}, ids, values_to_send);

                  newReport(data)
                    .then((res) => {
                      console.log(res);
                      this.setState({ isSuccess: true });
                      setSubmitting(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              }}
              validate={(values) => {
                console.log(values);
                let errors = {};
                if (values.tags == []) {
                  errors.labels = "At least one tag is required!";
                }
                if (values.rating_st == "null") {
                  errors.rating_st = "Rating is required!";
                }
                if (values.fake_st == "null") {
                  errors.fake_st = "You must have thoughts!";
                }
                return errors;
              }}
            >
              {({
                handleSubmit,
                errors,
                isSubmitting,
                values,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {this.state.isSuccess && <Redirect to="/after_report" />}
                  <div className="input-group">
                    <TagsInput
                      name="tags"
                      value={values.tags}
                      onChange={(tags) => {
                        setFieldValue("tags", tags);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="tags"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="subm">
                    <button
                      className="btn-two blue mini"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      );
    else
      return (
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      );
  }
}

export default Report;
