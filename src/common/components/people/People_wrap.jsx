import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { loadPeople } from '../../actions/people';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Person from './Person';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPeople()),
};

const mapStateToProps = state => ({
  people: state.people,
});

const People = ({ people }) => (
  <div>
    <Helmet title="People" />
    {people.isLoading &&
      <div>
        <h2>Loading....</h2>
      </div>
    }
    {!people.isLoading &&
      people.data.map((person) => (
        <Person
          key={person.id}
          firstName={person.firstName}
          lastName={person.lastName}
          email={person.email}
          counter={person.counter.toString()}
        />
      ))
    }
  </div>
);

People.propTypes = {
  people: PropTypes.object.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(People));
