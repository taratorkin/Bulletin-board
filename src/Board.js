import React, { Component } from 'react';
import Post from './Post';
import Form from './Form';
import styles from './css/board.min.css'

export default class Board extends Component {
  render() {
    let renderedList = JSON.parse(this.props.postsList).map((item) => {
      if(item) {
        let isInEditMode = false;
        for(let i = 0, l = this.props.editMode.length; i < l; i++) {
          if(item.id === this.props.editMode[i]) {
            isInEditMode = true;
          }
        }

        if(isInEditMode) {
          return <Form callback={item => { this.props.disableEdit(item) }} key={ item.id } item={ item } editMode={ true }></Form>
        } else {
          return <Post key={ item.id } postData={ item } handleDelete={id => { this.props.handleDelete(id) }}
            handleEdit={id => { this.props.handleEdit(id) }}></Post>
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
