import React, { Component, Fragment } from 'react';
import Form from './Form';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      postsList: localStorage.getItem('postsList') || '[]'
    }
  }

  handleFormData(data) {
    this.setState((prevState, props) => {
      let listCopy = prevState.postsList;
      listCopy = JSON.parse(listCopy);
      listCopy.unshift(data);
      return { postsList: JSON.stringify(listCopy) };
    }, () => {
      localStorage.setItem('postsList', this.state.postsList);
    });
  }

  handleDelete(id) {
    this.setState((prevState, props) => {
      let listCopy = prevState.postsList;
      listCopy = JSON.parse(listCopy);
      for(let i = 0, l = listCopy.length; i < l; i++) {
        if(id === listCopy[i].id) {
          listCopy.splice(i, 1);
          break;
        }
      }
      return { postsList: JSON.stringify(listCopy) };
    }, () => {
      localStorage.setItem('postsList', this.state.postsList);
    });
  }

  render() {
    return (
      <Fragment>
        <Form callback={ this.handleFormData }></Form>
        <Board postsList={ this.state.postsList } handleDelete={id => { this.handleDelete(id) }}></Board>
      </Fragment>
    );
  }
}

export default App;
