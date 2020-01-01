import App from "next/app";
import React from "react";
import withReduxStore from "../util/with-redux-store";
import { Provider } from "react-redux";
import { MyProps } from "../type";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props as MyProps;
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
