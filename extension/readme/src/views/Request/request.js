import React, { Component } from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  useFormikContext,
  ErrorMessage,
} from "formik";

import { updateArticle } from "../../network/lib/article";
import { articleStorage, userStorage } from "../../chromeHelper";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

class Request extends Component {
  render() {
    return (
      <div className="form">
        {/* <h1>Request a Report</h1> */}
        <Formik
          initialValues={{
            id: "123",
            type: "request",
            content: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            var ids = { articleid: "", userid: "" };
            articleStorage.get((article) => {
              ids["articleid"] = article.id;
              console.log(article);
            });
            userStorage.get((user) => {
              ids["requestedby"] = user.userId;
              console.log(user);
            });
            console.log(ids);
            console.log(values);
            sleep(1000).then(() => {
              var data = Object.assign({}, ids, values);

              updateArticle(data)
                .then((res) => {
                  console.log(res);
                  setSubmitting(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            });

            // alert(JSON.stringify(values, null, 2));
            //console.log(JSON.stringify(values, null, 2));
          }}
          validate={(values) => {
            let errors = {};
            if (values.content == "") {
              errors.category = "You must fill in your request!";
            }
            if (values.rating == "null") {
              errors.rating = "Rating is required!";
            }
            if (values.fake == "null") {
              errors.fake = "You must have thoughts!";
            }
            return errors;
          }}
        >
          {({ handleSubmit, errors, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="commentsField">
                <Field
                  id="content"
                  name="content"
                  as="textarea"
                  rows="3"
                  maxLength="250"
                  placeholder="Type here your request"
                />
                <ErrorMessage
                  component="div"
                  name="content"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="submitButton">
                <button type="submit" disabled={isSubmitting}>
                  Submit Request
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Request;
