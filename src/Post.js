import React from 'react';
import styles from './css/post.min.css';
import phoneIcon from './img/phone-icon.svg';

export default ({ postData, handleDelete }) => {
  return (
    <div className={['col-12', styles.wrapper].join(' ')}>
      <div className={['col-8', styles.left].join(' ')}>
        <p className={styles.left__headline}>{ postData.headline }</p>
        <p>{ postData.text }</p>
        <img src={ postData.image }/>
      </div>
      <div className={['col-4', styles.right].join(' ')}>
        <div className={styles.right__contacts}>
          <img src={phoneIcon}/><span className={styles.right__contacts__phone}>{ postData.phone }</span>
        </div>
        <div>
          <div className={['col-12', styles.right__buttons__button, styles['right__buttons__button--edit']].join(' ')}>Редактировать</div>
          <div className={['col-12', styles.right__buttons__button, styles['right__buttons__button--delete']].join(' ')}
            onClick={ () => { handleDelete(postData.id) } }>Удалить</div>
        </div>
      </div>
    </div>
  );
}
