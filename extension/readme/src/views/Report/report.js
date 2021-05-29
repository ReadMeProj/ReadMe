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

function Report() {
  return (
    <div className="form">
      <Formik
        initialValues={{
          type: "report",
          id: "123",
          category: "null",
          fake: "null",
          rating: "null",
        }}
        onSubmit={(values, { setSubmitting }) => {
          var ids = { articleid: "", userid: "" };
          articleStorage.get((article) => {
            ids["articleid"] = article.id;
            console.log(article);
          });
          userStorage.get((user) => {
            ids["userid"] = user.userId;
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
          if (values.category == "null") {
            errors.category = "Category is required!";
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
            <div className="cat">
              <Field as="select" name="category">
                <option value="null">Select category</option>
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
              <ErrorMessage
                component="div"
                name="category"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="fak">
              <Field as="select" name="fake">
                <option value="null">What's between the lines</option>
                <option value="true">Real/ Authentic</option>
                <option value="fake">Fake/ Sponsored</option>
                <option value="none">Not Sure</option>
              </Field>
              <ErrorMessage
                component="div"
                name="fake"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="rat">
              <Field as="select" name="rating">
                <option value="null">Select rating</option>
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
              <ErrorMessage
                component="div"
                name="rating"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="subm">
              <button className="btn-two blue mini" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Report;
