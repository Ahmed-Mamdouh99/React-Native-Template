/**
 * @format
 */

import 'react-native';
import React from 'react';
import AddMovie from '../../src/components/AddMovie';
import UiWrapper from '../../src/UiWrapper';
import {render, fireEvent, act} from '@testing-library/react-native';

describe('Add movie form component works', () => {
  it('Should render component', () => {
    render(
      <UiWrapper>
        <AddMovie addMovie={() => {}} />
      </UiWrapper>,
    );
  });

  describe('Text input fields work', () => {
    it('Should update title input value', () => {
      const queries = render(
        <UiWrapper>
          <AddMovie addMovie={() => {}} />
        </UiWrapper>,
      );
      act(() =>
        fireEvent(
          queries.getByTestId('titleInput'),
          'onChangeText',
          movieTemplate.title,
        ),
      );
      queries.getByDisplayValue(movieTemplate.title);
    });

    it('Should update overview input value', () => {
      const queries = render(
        <UiWrapper>
          <AddMovie addMovie={() => {}} />
        </UiWrapper>,
      );
      act(() =>
        fireEvent(
          queries.getByTestId('overviewInput'),
          'onChangeText',
          movieTemplate.overview,
        ),
      );
      queries.getByDisplayValue(movieTemplate.overview);
    });
  });

  it('Sets date properly', () => {
    const queries = render(
      <UiWrapper>
        <AddMovie addMovie={() => {}} />
      </UiWrapper>,
    );
    act(() =>
      fireEvent(
        queries.getByTestId('dateInput'),
        'onSelect',
        movieTemplate.date,
      ),
    );
    queries.getByText(formatDate(movieTemplate.date));
  });

  it('Submits form properly', () => {
    const mockFn = jest.fn();
    const queries = render(
      <UiWrapper>
        <AddMovie addMovie={mockFn} />
      </UiWrapper>,
    );
    act(() =>
      fireEvent(
        queries.getByTestId('titleInput'),
        'onChangeText',
        movieTemplate.title,
      ),
    );
    act(() =>
      fireEvent(
        queries.getByTestId('overviewInput'),
        'onChangeText',
        movieTemplate.overview,
      ),
    );
    act(() =>
      fireEvent(
        queries.getByTestId('dateInput'),
        'onSelect',
        movieTemplate.date,
      ),
    );
    act(() => fireEvent.press(queries.getByTestId('submitButton')));
    expect(mockFn).toBeCalledWith({
      title: movieTemplate.title,
      posterUri: null,
      overview: movieTemplate.overview,
      date: movieTemplate.date,
    });
  });
});

const movieTemplate = {
  title: 'movie title',
  overview: Array(50).fill('movie overview').join(' '),
  date: new Date(),
  poster: null,
};

const pad = s => `${s}`.padStart(2, '0');
const formatDate = date =>
  [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/');
