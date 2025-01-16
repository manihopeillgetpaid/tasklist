import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/Task.jsx';
import './taskList.css';

const TaskList = ({
  todos, onDeleted, onToggleDone, onToggleEditing,
}) => {
  const elements = todos.map((item) => {
    const { id, createdAt, ...itemProps } = item;
    return (
      <Task
        key={id}
        createdAt={createdAt}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEditing={(newValue) => onToggleEditing(id, newValue)} // Передаем строку
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    }),
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
};
TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEditing: () => {},
};
export default TaskList;
