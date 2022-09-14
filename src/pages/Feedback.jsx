import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MIN = 3;

class Feedback extends Component {
  render() {
    const { assertions, scoreTotal } = this.props;

    return (
      <div>
        <h3 data-testid="feedback-text">
          {assertions < MIN
            ? <span>Could be better...</span> : <span>Well Done!</span>}
        </h3>
        <span data-testid="feedback-total-score">{scoreTotal}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  scoreTotal: state.player.scoreTotal,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  scoreTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
