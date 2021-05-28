import React, { Component } from "react";
import { Formik, Field, Form, useField, useFormikContext } from "formik";

import {updateArticle} from "../../network/lib/article";
import { articleStorage, userStorage } from "../../chromeHelper";

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

class Request extends Component {
  render() {
    return (
      <div className="form">
        {/* <h1>Request a Report</h1> */}
        <Formik
          initialValues={{
            id:'123',
            type:'request',
            content:''
          }}
          onSubmit={(values, { setSubmitting }) => {
            var ids={articleid:"",userid:""};
            articleStorage.get((article) => {
              ids['articleid'] = article.id;
              console.log(article);
            });
            userStorage.get((user) => {
              ids['requestedby'] = user.userId;
              console.log(user);
            });
            console.log(ids);
            console.log(values);
            sleep(1000).then(()=>{var data=Object.assign({},ids,values);
  
            updateArticle(data)
              .then((res) => {
                console.log(res);
                setSubmitting(false);
              })
              .catch((err) => {
                console.log(err);
              });})
            
            // alert(JSON.stringify(values, null, 2));
            //console.log(JSON.stringify(values, null, 2));
          }}
          validate={() => ({})}
        >
          <Form>
            <div className="commentsField">
              <label htmlFor="content">Comments</label>
              <Field
                id="content"
                name="content"
                placeholder="Type here your request"
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
