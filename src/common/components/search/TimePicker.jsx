import React, { Component, PropTypes } from 'react';

class TimePicker extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { setTime } = this.props;
    return (
      <div
        className="timepicker"
      >
        <div className="timepicker__group timepicker__group--am">
          <h2 className="timepicker__header timepicker__header--am ">
            AM
            <span className="icon icon-sun"></span>
          </h2>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('00:00')}
            >Midnight</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('00:30')}
            >12:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('01:00')}
            >1:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('01:30')}
            >1:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('02:00')}
            >2:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('02:30')}
            >2:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('03:00')}
            >3:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('03:30')}
            >3:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('04:00')}
            >4:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('04:30')}
            >4:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('05:00')}
            >5:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('05:30')}
            >5:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('06:00')}
            >6:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('06:30')}
            >6:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('07:00')}
            >7:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('07:30')}
            >7:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('08:00')}
            >8:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('08:30')}
            >8:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('09:00')}
            >9:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('09:30')}
            >9:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('10:00')}
            >10:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('10:30')}
            >10:30 am</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--left"
              onClick={setTime('11:00')}
            >11:00 am</button>
            <button
              className="timepicker__button timepicker__button--right"
              onClick={setTime('11:30')}
            >11:30 am</button>
          </div>
          <h2 className="timepicker__footer timepicker__header--am">
            AM
            <span className="icon icon-sun"></span>
          </h2>
        </div>
        <div className="timepicker__group timepicker__group--pm">
          <h2 className="timepicker__header timepicker__header--pm">
            PM
            <span className="icon icon-moon"></span>
          </h2>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('12:00')}
            >Noon</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('12:30')}
            >12:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('13:00')}
            >1:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('13:30')}
            >1:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('14:00')}
            >2:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('14:30')}
            >2:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('15:00')}
            >3:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('15:30')}
            >3:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('16:00')}
            >4:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('16:30')}
            >4:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('17:00')}
            >5:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('17:30')}
            >5:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('18:00')}
            >6:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('18:30')}
            >6:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('19:00')}
            >7:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('19:30')}
            >7:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('20:00')}
            >8:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('20:30')}
            >8:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('21:00')}
            >9:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('21:30')}
            >9:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('22:00')}
            >10:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('22:30')}
            >10:30 pm</button>
          </div>
          <div className="timepicker__button-group">
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--left"
              onClick={setTime('23:00')}
            >11:00 pm</button>
            <button
              className="timepicker__button timepicker__button--pm timepicker__button--right"
              onClick={setTime('23:30')}
            >11:30 pm</button>
          </div>
          <h2 className="timepicker__footer timepicker__header--pm ">
            PM
            <span className="icon icon-moon"></span>
          </h2>
        </div>
      </div>
    );
  }
}

TimePicker.propTypes = {
  setTime: PropTypes.func.isRequired,
};

export default TimePicker;
