import React from 'react';
import PropTypes from 'prop-types';

import './spacer.less';

export default class Spacer extends React.Component {

  getClassNames() {
    return ['spacer', this.props.size].join(' ');
  }

  render() {
    return <div className={this.getClassNames()} />;
  }

}

Spacer.propTypes = {
  size: PropTypes.oneOf([
    'mini',
    'tiny',
    'small',
    'large',
    'big',
    'huge',
  ]),
};

Spacer.defaultProps = {
  size: 'm',
};
