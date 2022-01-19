/**
 * @format
 */

import 'react-native';
import React from 'react';
import UiWrapper from '../../src/UiWrapper';
import {render, fireEvent, act} from '@testing-library/react-native';
import AddMovieModal from '../../src/components/AddMovieModal';

describe('Add movie modal component works', () => {
  it('renders properly', () => {
    render(
      <UiWrapper>
        <AddMovieModal addMovie={() => {}} />
      </UiWrapper>,
    );
  });

  it('hides modal to be hidden initially', () => {
    const {container} = render(
      <UiWrapper>
        <AddMovieModal addMovie={() => {}} />
      </UiWrapper>,
    );
    expect(container.children.length).toBe(1);
  });

  it('shows modal when button pressed', () => {
    const queries = render(
      <UiWrapper>
        <AddMovieModal addMovie={() => {}} />
      </UiWrapper>,
    );
    // Press show modal button
    act(() => fireEvent.press(queries.getByTestId('showButton')));
    queries.getByTestId('modalLayout');
  });

  it('hides when cancel button pressed', () => {
    const queries = render(
      <UiWrapper>
        <AddMovieModal addMovie={() => {}} />
      </UiWrapper>,
    );
    act(() => fireEvent.press(queries.getByTestId('showButton')));
    act(() => fireEvent.press(queries.getByTestId('hideButton')));
    expect(queries.container.children.length).toBe(1);
  });

  it('hides modal when movie added', () => {
    const queries = render(
      <UiWrapper>
        <AddMovieModal addMovie={() => {}} />
      </UiWrapper>,
    );
    const template = {id: new Date()};
    act(() => fireEvent.press(queries.getByTestId('showButton')));
    queries.getByTestId('modalLayout').children[0].props.addMovie(template);
    expect(queries.container.children.length).toBe(1);
  });

  it('calls addMovie when movie added', () => {
    const mockFn = jest.fn();
    const queries = render(
      <UiWrapper>
        <AddMovieModal addMovie={mockFn} />
      </UiWrapper>,
    );
    const template = {id: new Date()};
    act(() => fireEvent.press(queries.getByTestId('showButton')));
    queries.getByTestId('modalLayout').children[0].props.addMovie(template);
    expect(mockFn).toBeCalledWith(template);
  });
});
