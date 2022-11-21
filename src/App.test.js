import {fireEvent, queryByText, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {MemoryRouter} from "react-router-dom";
import Header from "./features/misc/Header";
import * as React from "react";
import App from "./App";

describe('App', () => {
   it('checks welcome message shows', () => {
       var component = render(
           <Provider store={store}>
                   <App />
           </Provider>
       );

       var welcomeMessage = component.getByText('Please Select Your Account');

       expect(welcomeMessage).toBeInTheDocument();
   });

   it('checks account select shows', () => {
       var component = render(
           <Provider store={store}>
                   <App />
           </Provider>
       );

       var accountSelect = component.getByTestId('accountSelect');

       expect(accountSelect).toBeInTheDocument();
   });

   it('checks signature renders', () => {
       var component = render(
           <Provider store={store}>
                   <App />
           </Provider>
       );
       expect(component.getByText('Made by David')).toBeInTheDocument();
   })
});