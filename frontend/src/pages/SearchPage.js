import React, { useState } from 'react';
import { func, string, shape } from 'prop-types';

import { connect } from 'react-redux';

import {
  Alert,
} from 'react-bootstrap';

import Loading from '../components/atoms/Loading';
import UauList from '../components/molecules/UauList';
import Pagination from '../components/molecules/Pagination';
import Search from '../components/molecules/Search';

import ItemsTemplate from '../components/templates/ItemsTemplate';

import useSearch from './searchPage.utils';
import { addMovie } from '../redux/actions';
import { getMoviesByIds } from '../redux/selectors';

const SearchPage = ({ moviesByIds, ...props }) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const {
    error,
    items,
    loading,
    numberOfItems,
  } = useSearch(query, page);

  return (
    <ItemsTemplate
      error={error
        ? <Alert variant="primary">Erro ao efetuar a busca</Alert>
        : undefined}
      loading={loading
        ? <Loading />
        : undefined}
      items={(
        <UauList
          actionLabel="UAU"
          handleItemClick={(item) => props.addMovie(item)}
          items={items}
          moviesByIds={moviesByIds}
        />
      )}
      pagination={(
        <Pagination
          currentPage={page}
          handlePageClick={setPage}
          numberOfItems={Number(numberOfItems)}
        />
      )}
      search={<Search handleSearch={setQuery} />}
      title="Front-end dev Mobiliza - Movie App"
    />
  );
};

SearchPage.defaultProps = {
  addMovie: () => {},
  moviesByIds: {},
};

SearchPage.propTypes = {
  addMovie: func,
  moviesByIds: shape({
    imdbID: string,
  }),
};

const mapStateToProps = (state) => ({ moviesByIds: getMoviesByIds(state) });

export default connect(
  mapStateToProps,
  { addMovie },
)(SearchPage);
