import { render, screen } from '@testing-library/react';
import * as React from 'react';

const Greetings = (props) => {
    let name = props.name;

    return (
        <div>
            <h1>
                {props.name ? ('Welcome back ' + name + '!') : ('Welcome!')}
            </h1>
            <button onClick={()=> name = 'david'}></button>
        </div>

    );
}

test('renders learn react link', () => {
    render(<h1>Hiya</h1>);
    // screen.debug();
});

describe('Greeting', () => {
    const view = render(<Greetings />);
    expect(view).toMatchSnapshot();
})

test('check name is on screen', () => {
    render(<Greetings />)

    let userName = screen.getByText('Welcome!');
    expect(userName).toBeInTheDocument();
})