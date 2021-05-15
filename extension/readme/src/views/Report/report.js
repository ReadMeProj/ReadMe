import React from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { Formik, Field, Form, useField, useFormikContext } from "formik";

function Report() {
  const initialValues = {
    mainCat: "",
    subCat: "",
    fake: "",
    rating: "0",
    haveProof: false,
    proof: "",
  };

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        //  onSubmit={values => {alert(JSON.stringify(values, null, 2));}}
      >
        <label htmlFor="category"> Category:</label>

        <Field as="select" name="mainCat">
          <option value="None">Select category</option>
          <option value="news">News</option>
          <option value="review">Review</option>
        </Field>

        <label htmlFor="subCategory"> Sub Category:</label>
        <Field as="select" name="subCat">
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

        <label htmlFor="fake"> You Think it is:</label>
        <Field as="select" name="fake">
          <option value="true">Real/ Authentic</option>
          <option value="fake">Fake/ Sponsored</option>
          <option value="none">Not Sure</option>
        </Field>
        <label htmlFor="haveProof">Have a Proof: </label>
        <Field type="checkbox" name="haveProof" />
        <label htmlFor="proof">Proof Address:</label>
        <Field name="proof" placeholder="http://" />
        <label htmlFor="rating">Rate it:</label>

        <Field as="select" name="rating">
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
        <input type="submit" value="Submit" />
      </Formik>
    </div>
  );
}

export default Report;
