import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Redux setup
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

// Redux setup for devtools
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
