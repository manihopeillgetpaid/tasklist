import React, { Fragment } from "react";
import TaskList from './components/taskList/TaskList';
import './app.css'
import NewTaskForm from "./components/newTaskForm/NewTaskForm";
import Footer from "./components/footer/Footer";
import PropTypes from "prop-types";

export default class App extends React.Component{
  elemId= 1;
 state ={
todoData: [
   this.createTodoItem('Drink Coffee'),
   this.createTodoItem('create react app'),
   this.createTodoItem('Listen to music')
],
createdAt: new Date(),
term: '',
filter: 'all'
 }
 createTodoItem(label){
  return {
    label,
    done: false,
    editing: false,
    id: this.elemId++,
    liStyle: [
      'active', 'editing', 'completed'
    ],
    createdAt: new Date()
  };
 

 };
 
 deleteItem = (id) => {
  this.setState(({ todoData }) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = todoData.toSpliced(idx,  1);
    return{
      todoData: newArray
    };
  });
 };
 addItem = (text) => {
  let newItem = this.createTodoItem(text);
  this.setState(({ todoData }) => {
    let newArr = [
      ...todoData, newItem
    ];
    return {
      todoData: newArr
    };
  });
 };
 toggleProperty(arr, id, propName){
  const idx = arr.findIndex((el) => el.id === id);
  const oldItem = arr[idx];
  const newItem = { ...oldItem, [propName]: !oldItem[propName]};
    return [
    ...arr.slice(0, idx),
    newItem, 
    ...arr.slice(idx+1)
  ];
 }
onToggleDone =(id) =>{
this.setState(({ todoData }) =>{
  return {
    todoData: this.toggleProperty(todoData, id, 'done')
  }
} )
}
onToggleEditing = (id) => {
  this.setState(({ todoData } ) => {
    return{
      todoData: this.toggleProperty(todoData, id, 'editing')
    }
  })
}

filter(items, filter){
  switch(filter){
    case 'all': 
    return items;
    case 'active':
      return items.filter((item) => !item.done);
    case 'completed':
      return items.filter((item) => item.done);
    
  }
}
search(items, term) {
  if(term.length === 0){
    return items
  };
  return items.filter((item) => {
return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
  });

};
onClearCompleted = () => {
  this.setState(({ todoData }) => {
    return {
      todoData: todoData.filter((task) => !task.done)
    }
  })
}

  onFilterChange = (filter) => {
    this.setState({ filter })
  }
    render(){ 
      const { todoData,term, filter } = this.state; 
      const visibleItems = this.filter(this.search(todoData, term), filter)
      const doneCount = todoData.filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;
      return(
      <section className="todoapp">
        <NewTaskForm   addItem={this.addItem}/>
        <section className="main">
      <TaskList todos={visibleItems} style={todoData}
      onDeleted={this.deleteItem}
      onToggleDone={this.onToggleDone}
      onToggleEditing={this.onToggleEditing}
 />
      <Footer toDo={todoCount} filter={filter} onFilterChange={this.onFilterChange} onClearCompleted={this.onClearCompleted}/>
     
      
     
        </section>

       </section>
    )
  }}

  App.propTypes = {
    addItem: PropTypes.func,
    deleteItem: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onClearCompleted: PropTypes.func
  }

  App.defaultProps= {
    addItem: () => {},
  deleteItem: () => {},
  onToggleDone: () => {},
  onToggleEditing: () => {},
  onClearCompleted: () => {}
  }