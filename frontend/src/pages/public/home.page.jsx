import React from "react";

const HomePage = () => {
  return (
    <>
      <h1 style={{ color: "red" }}>Project Abandoned</h1>
      <p>
        Project has been abandoned due to lack of time. Backend APIs are fully
        functional.
      </p>
      <p>
        Log in (or sign up), grab token from the console and head to{" "}
        <a
          href="https://trackmyreading.mjfelix.dev/api/v1/docs/"
          target="_blank"
          rel="noreferrer"
        >
          Swagger documentation page
        </a>{" "}
        where you will be able to make authenticated API calls.
      </p>
    </>
  );
};

export default HomePage;
