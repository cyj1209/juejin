import React, { Props } from "react";
import * as next from "next";
import { getOrCreateStore } from "../store/store";
import { MyPageCtx, MyProps } from "../type";

const App = App => {
  const AppWithRedux: next.NextPage = (props: any) => {
    return (
      <App
        {...props}
        reduxStore={getOrCreateStore(props.initialReduxState)}
      ></App>
    );
  };

  AppWithRedux.getInitialProps = async (appContext: MyPageCtx) => {
    const reduxStore = getOrCreateStore();
    appContext.ctx.reduxStore = reduxStore;
    let appProps = {};
    if (typeof App.getInitialProps === "function") {
      appProps = await App.getInitialProps(appContext);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    };
  };
  return AppWithRedux;
};

export default App;
