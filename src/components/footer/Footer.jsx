import React, { Component, Children } from "react";
import './footer.css';
import PropTypes from 'prop-types'
import TasksFilter from "../tasksFilter/TasksFilter";
export default class Footer extends React.Component{
  render(){
    const { toDo, filter, onFilterChange, onClearCompleted } = this.props;
    return(
        <footer class="footer">
        <span className="todo-count">{toDo} items left</span>
       <TasksFilter filter={filter} onFilterChange={onFilterChange}/>
        <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>
    )
}}

Footer.propTypes = {
  toDo: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired
}
Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
  onFilterChange: () => {},
  onClearCompleted: () => {}
}