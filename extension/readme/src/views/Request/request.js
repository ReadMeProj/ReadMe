import React, { Component } from "react";
import { Formik, Field, Form, useField, useFormikContext } from "formik";

class Request extends Component {
  render() {
    return (
      <div className="form">
        {/* <h1>Request a Report</h1> */}
        <Formik
          initialValues={{ comments: "" }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <div className="commentsField">
              <label htmlFor="comments">Comments</label>
              <Field
                id="comments"
                name="comments"
                placeholder="Type here any special requests"
              />
            </div>
            <div className="submitButton">
              <button type="submit">Submit Request</button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Request;
