import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from './Counter';
import * as CounterActions from '../../actions/counter';

const mapStateToProps = (state) => (
  { counter: state.counter }
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
