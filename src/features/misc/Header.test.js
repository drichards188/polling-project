import * as React from 'react';
import {render} from '@testing-library/react';
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
});