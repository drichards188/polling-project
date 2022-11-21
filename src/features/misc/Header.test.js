import * as React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Header from "./Header";
import {store} from "../../app/store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

describe('Header', () => {
    it('matches the snapshot', () => {
        var component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });

    it('checks header does not disappear', () => {
        var component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider>
        );

        var addPullButton = component.getByTestId('addPollButton');

        expect(addPullButton).toBeInTheDocument();

        fireEvent.click(addPullButton);

        expect(addPullButton).toBeInTheDocument();

    });
});