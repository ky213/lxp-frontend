import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import RRuleGenerator from 'react-rrule-generator';

import './styles.css';

const RRule = props => {
  useEffect(() => {
    return () => {
      props.onChange(null);
    };
  }, []);

  return (
    <RRuleGenerator
      value={props.rrule}
      onChange={props.onChange}
      config={{
        weekStartsOnSunday: true,
      }}
    />
  );
};

export default RRule;

RRule.propTypes = {
  rrule: PropTypes.string,
  onChange: PropTypes.func,
};
