import React, { PropTypes } from 'react';
import ReactHelmet from 'react-helmet';

const Results = ({ params }) => (
  <div>
    <ReactHelmet title="Results" />
    <div className="subhead">Results</div>
    <p>{params.searchQuery.split('|').join(' --- ')}</p>
  </div>
);

Results.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Results;
