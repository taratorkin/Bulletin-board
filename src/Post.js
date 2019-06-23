import React from 'react';
import styles from './css/post.min.css';
import phoneIcon from './img/phone-icon.svg';
import mapMarker from './img/map-marker.svg';

export default ({ postData, handleDelete, handleEdit }) => {
  return (
    <div className={['col-12', styles.wrapper].join(' ')}>
      <div className={['col-8', styles.left].join(' ')}>
        <p className={styles.left__headline}>{ postData.headline }</p>
        <p>{ postData.text }</p>
        <img src={ postData.image } alt=""/>
      </div>
      <div className={['col-4', styles.right].join(' ')}>
        <div className={styles.right__contacts}>
          <div className={styles.right__contacts__container}>
            <img src={phoneIcon} alt=""/><span>{ postData.phone }</span>
          </div>
          {postData.city ? <div className={styles.right__contacts__container}>
            <img src={mapMarker} alt=""/><span>{ postData.city }</span>
          </div> : ''}    
        </div>
        <div>
          <div className={['col-12', styles.right__buttons__button, styles['right__buttons__button--edit']].join(' ')}
            onClick={ () => { handleEdit(postData.id) } }>Редактировать</div>
          <div className={['col-12', styles.right__buttons__button, styles['right__buttons__button--delete']].join(' ')}
            onClick={ () => { handleDelete(postData.id) } }>Удалить</div>
        </div>
      </div>
    </div>
  );
}
