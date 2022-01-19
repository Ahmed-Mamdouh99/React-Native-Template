/**
 * @format
 */

import 'react-native';
import React from 'react';
import Movie from '../../src/components/Movie';
import UiWrapper from '../../src/UiWrapper';
import posterPlaceholder from '../../static/placeHolderPosterLight.png';
import {render, fireEvent, act} from '@testing-library/react-native';

describe('Movie display component', () => {
  describe('header items', () => {
    it('Should render component', () => {
      render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
    });

    it('Shows correct title', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      const text = queries.getByTestId('titleText');
      expect(text.children[0]).toEqual(movieTemplate.title);
    });

    it('Shows correct date', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      const text = queries.getByTestId('dateText');
      expect(text.children[0]).toEqual(movieTemplate.date.toDateString());
    });
  });

  describe('overview logic', () => {
    it('shows correct overview tip', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      const text = queries.getByTestId('showOverviewTipText');
      expect(text.children[0]).toEqual('Tap to show overview');
    });

    it('Shows correct overview tip when pressed', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      // Trigger onPress event
      const overviewToggle = queries.getByTestId('overviewToggle');
      act(() => fireEvent.press(overviewToggle));
      const text = queries.getByTestId('showOverviewTipText');
      expect(text.children[0]).toEqual('Tap to hide overview');
    });

    it('hides overview initially', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      const text = queries.getByTestId('overviewText');
      expect(text.children[0]).toEqual('');
    });

    it('shows overview when pressed', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      // Trigger onPress event
      const overviewToggle = queries.getByTestId('overviewToggle');
      act(() => fireEvent.press(overviewToggle));
      const text = queries.getByTestId('overviewText');
      expect(text.children[0]).toEqual(movieTemplate.overview);
    });
  });

  describe('Poster image logic', () => {
    it('sets correct image source', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={{...movieTemplate, poster: posterPlaceholder}} />
        </UiWrapper>,
      );
      const image = queries.getByTestId('posterImage');
      expect(image.props.source).toEqual(posterPlaceholder);
    });

    it('sets placeholder image', () => {
      const queries = render(
        <UiWrapper>
          <Movie item={movieTemplate} />
        </UiWrapper>,
      );
      const image = queries.getByTestId('posterImage');
      expect(image.props.source.uri).not.toBeNull();
    });
  });
});

const movieTemplate = {
  title: 'movie title',
  overview: Array(50).fill('movie overview').join(' '),
  date: new Date(),
  poster: null,
};
