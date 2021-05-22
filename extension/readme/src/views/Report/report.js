import React, { Component } from "react";
import { Formik, Field, Form, useField, useFormikContext } from "formik";

import updateArticle from "../../network/lib/article";
import {articleStorage, userStorage} from '../../chromeHelper'



class Report extends Component {
  render() {
    return (
      <div className="form">
        <Formik
          initialValues={{
            id:"123",
            cat: "",
            fake: "",
            rating: "0",
          }}
          onSubmit={(values) => {
            // addvalues
            articleStorage.get((article) => { values.article_id=article.article_id;})
            userStorage.get((user) => { values.user_id=user.user_id;})

            // updatea_article(values)
            updateArticle(values)
            // alert(JSON.stringify(values, null, 2));
            console.log(JSON.stringify(values, null, 2))

          }}
        >
          <Form>
            <div className="cat">
              <label htmlFor="category"> Category:</label>
              <Field as="select" name="cat">
                <option value="None">Select category</option>
                <option value="politics">Politics</option>
                <option value="sport">Sports</option>
                <option value="finance">Finance</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
                <option value="tech">Tech</option>
                <option value="music">Music</option>
                <option value="travel">Travel</option>
                <option value="cars">Cars</option>
              </Field>
            </div>
            <div className="fak">
              <label htmlFor="fake"> You Think it is:</label>
              <Field as="select" name="fake">
                <option value="true">Real/ Authentic</option>
                <option value="fake">Fake/ Sponsored</option>
                <option value="none">Not Sure</option>
              </Field>
            </div>
            <div className="rat">
              <label htmlFor="rating">Rate it:</label>
              <Field as="select" name="rating" >
                <option value="">Select rating</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
            </div>
            <div className="subm">
              <input type="submit" value="Submit" />
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Report;
