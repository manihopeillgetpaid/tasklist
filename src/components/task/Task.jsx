import React from 'react';
import './task.css';
import { formatDistanceToNowStrict } from 'date-fns';
import PropTypes from 'prop-types';
export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAgo: this.calculateTimeAgo(props.createdAt),
      editingValue: props.label,
    };
    this.inputRef = React.createRef();
  };
  calculateTimeAgo(createdAt) {
    return formatDistanceToNowStrict(new Date(createdAt), {addSuffix: true});
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      const { createdAt } = this.props;
      this.setState({
        timeAgo: this.calculateTimeAgo(createdAt)
      });
    }, 60000)
  };
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  handleBlur = () => {
    const { onToggleEditing } = this.props;
    const { editingValue } = this.state;
  
    onToggleEditing(editingValue); // Передаем строку, а не объект
  };
  
  handleKeyDown = (e) => {
    const { onToggleEditing } = this.props;
    const { editingValue } = this.state;
  
    if (e.key === 'Enter') {
      onToggleEditing(editingValue); // Передаем строку, а не объект
    }
  };
  handleChange = (event) => {
    this.setState({ editingValue: event.target.value }); // Сохраняем строку
  };
  render() {
    const { label, onDeleted, onToggleDone, done, editing, onToggleEditing } = this.props;

    // Рассчитываем, сколько времени прошло с момента создания
    const { timeAgo, editingValue } = this.state;

    let naming =''

    if (done) naming = 'completed';
    
    if (editing) naming = 'editing';

    return (
      <li className={naming}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{`Created ${timeAgo}`}</span> {/* выводим время */}
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {naming === 'editing' && (
          <input
          ref={this.inputRef}
           className="edit" type="text" 
           value={editingValue}
           onChange={this.handleChange}
           onBlur={this.handleBlur}
           onKeyDown={this.handleKeyDown}
           autoFocus />
        )}
      </li>
    );
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired, 
  onToggleEditing: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired
}
Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  editing: false,
  onToggleEditing: () => {},
  createdAt: new Date()
}