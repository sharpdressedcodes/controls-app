import React from 'react';
import { shallow } from 'enzyme';
import { ControlsPage } from './ControlsPage';
import data from '../server/data/controls.json';

const ERROR_MESSAGE = 'test';
const getControls = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve({ data: { getControls: {} } }))
    .mockReturnValueOnce(Promise.resolve({ data: { getControls: data } }))
    .mockReturnValueOnce(Promise.resolve({ data: { getControls: {} }, error: ERROR_MESSAGE }))
    .mockReturnValueOnce(Promise.resolve({ data: { getControls: {} }, error: ERROR_MESSAGE }))
    .mockReturnValueOnce(Promise.resolve({ data: { getControls: data } }));

async function addWait(milliSeconds = 0) {
    return new Promise(resolve => setTimeout(resolve, milliSeconds));
}

function render(props = {}) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return shallow(<ControlsPage getControls={getControls} {...props} />);
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
        expect(state.error).toEqual(ERROR_MESSAGE);

        done();
    });

    test('should show error when error occurs and be able to try again', async done => {
        const wrapper = await renderAndWait();
        let state = wrapper.state();

        expect(state.loading).toEqual(false);
        expect(state.error).toEqual(ERROR_MESSAGE);

        await wrapper.instance().onTryAgain();
        await addWait();

        state = wrapper.state();

        expect(state.error).toEqual(null);
        expect(Array.isArray(state.data)).toEqual(true);
        expect(state.data.length).not.toEqual(0);

        done();
    });
});
