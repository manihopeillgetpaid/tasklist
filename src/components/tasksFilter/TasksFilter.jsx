import React from 'react';
import './tasksFilter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = 'selected';

      return (
        <li>
          <button className={isActive ? clazz : null} key={name} onClick={() => onFilterChange(name)}>
            {' '}
            {label}{' '}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}
TasksFilter.propTypes = {
  filter: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
TasksFilter.defaultProps = {
  filter: () => {},
  onFilterChange: () => {},
};
