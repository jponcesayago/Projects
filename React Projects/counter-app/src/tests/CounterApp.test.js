import React from 'react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'


import CounterApp from '../CounterApp';

describe('Pruebas en <CounterApp />', () => {

    // test('debe de mostrar el mensaje "Hola, Soy Goku"', () => {
    //     const saludo = 'Hola, soy Goku';
    //     const { getByText } = render( <PrimeraApp saludo={ saludo } /> );
    //     expect( getByText( saludo ) ).toBeInTheDocument();
    // })

    test('debe de mostrar <CounterApp /> correctamente', () => {


        const wrapper = shallow(<CounterApp value={0} />);

        expect(wrapper).toMatchSnapshot();

    });

    test(' counter defualt value = "100"', () => {


        const wrapper = shallow(<CounterApp value={100} />);

        const defaultValue = wrapper.find('p').text();

        expect(defaultValue).toBe('100');

    });

    test(' counter button "+1" click event', () => {


        const wrapper = shallow(<CounterApp />);

        const btn1 = wrapper.find('button').at(0).simulate('click', {});


        const defaultValue = wrapper.find('p').text().trim();

        expect(defaultValue).toBe('1');


    });

    test(' counter button "-1" click event', () => {


        const wrapper = shallow(<CounterApp />);

        const btn1 = wrapper.find('button').at(2).simulate('click', {});


        const defaultValue = wrapper.find('p').text().trim();

        expect(defaultValue).toBe('-1');


    });

    test(' counter button "Reset" click event', () => {


        const wrapper = shallow(<CounterApp value={100} />);


        wrapper.find('button').at(0).simulate('click', {});
        wrapper.find('button').at(0).simulate('click', {});
        const btnReset = wrapper.find('button').at(1).simulate('click', {});

        const defaultValue = wrapper.find('p').text().trim();

        expect(defaultValue).toBe('100');


    });






})
