import React, { Component } from 'react';
import Post from './Post';
import Form from './Form';
import styles from './css/board.min.css'

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.state = {
      editMode: []
    }
  }

  handleEdit(id) {
    this.setState((prevState, props) => {
      prevState.editMode.unshift(id);
      return { editMode: prevState.editMode }
    });
  }

  disableEdit(item) {
    this.setState((prevState, props) => {
      for(let i = 0, l = prevState.editMode.length; i < l; i++) {
        if(item.id === prevState.editMode[i]) {
          prevState.editMode.splice(i, 1);
          break;
        }
      }
    }, () => {
      this.props.callback(item);
    }) ;
  }

  render() {
    let renderedList = JSON.parse(this.props.postsList).map((item, index) => {
      if(item) {
        if(item.id === this.state.editMode[index]) {
          return <Form callback={ this.disableEdit } key={ item.id } item={ item } editMode={ true }></Form>
        } else {
          return <Post key={ item.id } postData={ item } handleDelete={id => { this.props.handleDelete(id) }}
            handleEdit={id => { this.handleEdit(id) }}></Post>
        }
      } else {
        return '';
      }
    });
    return (
      <div className={['offset-3 col-6', styles.wrapper].join(' ')}>
        <p className={styles.headline}>Объявление</p>
        { renderedList }
      </div>
    );
  }
}
