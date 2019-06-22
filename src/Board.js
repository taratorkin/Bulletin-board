import React, { Component } from 'react';
import Post from './Post';
import styles from './css/board.min.css'

export default class Board extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let renderedList = JSON.parse(this.props.postsList).map((item) => {
      if(item) {
        return <Post key={ item.id } postData={ item }></Post>
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
