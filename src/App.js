import React, { Component, Fragment } from 'react';
import Form from './Form';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.state = {
      postsList: localStorage.getItem('postsList') || '[]',
      editMode: []
    }
  }

  handleFormData(data) {
      this.setState((prevState, props) => {
        let list = prevState.postsList;
        list = JSON.parse(list);
        list.unshift(data);
        return { postsList: JSON.stringify(list) };
      }, () => {
        localStorage.setItem('postsList', this.state.postsList);
      });
  }

  handleDelete(id) {
    this.setState((prevState, props) => {
      let list = prevState.postsList;
      list = JSON.parse(list);
      for(let i = 0, l = list.length; i < l; i++) {
        if(id === list[i].id) {
          list.splice(i, 1);
          break;
        }
      }
      return { postsList: JSON.stringify(list) };
    }, () => {
      localStorage.setItem('postsList', this.state.postsList);
    });
  }

  handleEdit(id) {
    this.setState((prevState, props) => {
      prevState.editMode.unshift(id);
      return { editMode: prevState.editMode }
    });
  }

  disableEdit(item) {
    this.setState((prevState, props) => {
      let list = prevState.postsList;
      list = JSON.parse(list);
      for(let i = 0, l = list.length; i < l; i++) {
        if(item.id === list[i].id) {
          list.splice(i, 1, item);
        }
      }

      for(let i = 0, l = prevState.editMode.length; i < l; i++) {
        if(item.id === prevState.editMode[i]) {
          prevState.editMode.splice(i, 1);
          break;
        }
      }

      return { postsList: JSON.stringify(list), editMode: prevState.editMode }
    }, () => {
      localStorage.setItem('postsList', this.state.postsList);
    });
  }

  render() {
    return (
      <Fragment>
        <Form callback={ this.handleFormData }></Form>
        <Board postsList={ this.state.postsList } handleDelete={id => { this.handleDelete(id) }} handleEdit={id => { this.handleEdit(id) }}
          disableEdit={item => { this.disableEdit(item) }} editMode={ this.state.editMode }></Board>
      </Fragment>
    );
  }
}

export default App;
