import React from 'react';
import { shallow } from 'enzyme';
import { ControlsPage } from './ControlsPage';

jest.mock('../api/getControls', () => {
    // eslint-disable-next-line global-require
    const data = require('../server/data/controls.json');

    return jest
        .fn()
        .mockReturnValueOnce(Promise.resolve({ data: { } }))
        .mockReturnValueOnce(Promise.resolve({ data: { items: data } }))
        .mockReturnValueOnce(Promise.resolve({ data: { error: 'test' } }))
        .mockReturnValueOnce(Promise.resolve({ data: { error: 'test' } }))
        .mockReturnValueOnce(Promise.resolve({ data: { items: data } }));
});

async function addWait(milliSeconds = 0) {
    return new Promise(resolve => setTimeout(resolve, milliSeconds));
}

function render(props = {}) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return shallow(<ControlsPage {...props} />);
}

async function renderAndWait(props = {}) {
    const wrapper = render(props);

    await addWait();

    return wrapper;
}

describe('components/ControlsPage', () => {
    test('should see loading spinner while loading', () => {
        const wrapper = render();

        expect(wrapper.state().loading).toEqual(true);
    });

    test('should see all controls loaded', async done => {
        const wrapper = await renderAndWait();
        const state = wrapper.state();

        expect(state.loading).toEqual(false);
        expect(state.error).toEqual(null);
        expect(state.data).not.toEqual([]);

        done();
    });

    test('should show error when error occurs', async done => {
        const wrapper = await renderAndWait();
        const state = wrapper.state();

        expect(state.loading).toEqual(false);
        expect(state.error).toEqual('test');

        done();
    });

    test('should show error when error occurs and be able to try again', async done => {
        const wrapper = await renderAndWait();
        let state = wrapper.state();

        expect(state.loading).toEqual(false);
        expect(state.error).toEqual('test');

        await wrapper.instance().onTryAgain();
        await addWait();

        state = wrapper.state();

        expect(state.error).toEqual(null);
        expect(Array.isArray(state.data)).toEqual(true);
        expect(state.data.length).not.toEqual(0);

        done();
    });
});
