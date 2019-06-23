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
    if(data.editMode) {
      this.setState((prevState, props) => {
        let list = prevState.postsList;
        list = JSON.parse(list);
        delete data.editMode;
        for(let i = 0, l = list.length; i < l; i++) {
          if(data.id === list[i].id) {
            list.splice(i, 1, data);
          }
        }
        return { postsList: JSON.stringify(list) }
      }, () => {
        localStorage.setItem('postsList', this.state.postsList);
      });
    } else {
      this.setState((prevState, props) => {
        let list = prevState.postsList;
        list = JSON.parse(list);
        list.unshift(data);
        return { postsList: JSON.stringify(list) };
      }, () => {
        localStorage.setItem('postsList', this.state.postsList);
      });
    }
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

  render() {
    return (
      <Fragment>
        <Form callback={ this.handleFormData }></Form>
        <Board callback={ this.handleFormData } postsList={ this.state.postsList } handleDelete={id => { this.handleDelete(id) }}></Board>
      </Fragment>
    );
  }
}

export default App;
