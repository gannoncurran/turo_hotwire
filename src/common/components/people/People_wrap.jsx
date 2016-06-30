import { provideHooks } from 'redial';
import React,
{ PropTypes } from 'react';
import { loadPeople, incrementCounter, decrementCounter } from '../../actions/people';
import { connect } from 'react-redux';
import ReactHelmet from 'react-helmet';
import Person from './Person';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPeople()),
};

const mapStateToProps = state => ({
  people: state.people,
});

const mapDispatchToProps = (dispatch) => ({
  handleIncrement: (id) => () => {
    dispatch(incrementCounter(id));
  },
  handleDecrement: (id) => () => {
    dispatch(decrementCounter(id));
  },
});

const People = ({
  people,
  handleIncrement,
  handleDecrement,
}) => (
  <div>
    <ReactHelmet title="People" />
    {people.error &&
      <div
        style={{
          borderRadius: '5px',
          margin: '0px',
          padding: '20px',
          border: '1px solid red',
          backgroundColor: 'pink',
        }}
      >
        <p
          style={{
            margin: '0px',
          }}
        >
          Something went wrong. Try again later.
        </p>
      </div>
    }
    {people.isLoading &&
      <div>
        <h2>Loading....</h2>
      </div>
    }
    {!people.isLoading &&
      people.data.map((person) => (
        <Person
          id={person.data.id}
          key={person.data.id}
          firstName={person.data.firstName}
          lastName={person.data.lastName}
          email={person.data.email}
          counter={person.data.counter}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      ))
    }
  </div>
);

People.propTypes = {
  people: PropTypes.object.isRequired,
  handleIncrement: PropTypes.func,
  handleDecrement: PropTypes.func,
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(People));
