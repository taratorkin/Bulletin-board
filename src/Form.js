import React, { Component } from 'react';
import styles from './css/form.min.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.state = {
      posts: []
    }
  }

  loadImage(e) {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      preview.style.maxWidth = "300px";
      preview.style.height = "auto";
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

  handleForm(e) {
    e.preventDefault();

  }

  render() {
    return (
        <form onSubmit={this.handleForm}>
          <p className={[styles['top-text'], 'offset-3 col-3'].join(' ')}>Подать объявление</p>

          <label htmlFor="headline" className={'offset-3 col-3'}>Заголовок:</label>
          <input className={[styles['text-field'], 'offset-3 col-4'].join(' ')} type="text" name="headline" maxLength="140"/>
          <div className={[styles.validation, styles['validation--initial']].join(' ')}>
            <i class="far fa-question-circle" style={{margin: '0 10px'}}></i>
            <div style={{display: 'inline-block'}}>Обязательное поле<br />Не более 140 символов</div>
          </div>

          <label htmlFor="text" className={'offset-3 col-3'}>Текст объявления:</label>
          <input className={[styles['text-field'], styles.description, 'offset-3 col-4'].join(' ')} type="text" name="text" maxLength="300"/>
          <div className={[styles.validation, styles['validation--initial']].join(' ')}>
            <i class="far fa-question-circle" style={{margin: '0 10px'}}></i>
            <div style={{display: 'inline-block'}}>Обязательное поле<br />Не более 300 символов</div>
          </div>

          <label htmlFor="phone" className={'offset-3 col-3'}>Телефон:</label>
          <input className={[styles['text-field'], 'offset-3 col-4'].join(' ')}
            type="tel" name="phone" maxLength="18" pattern="+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}" placeholder="+7 (___) ___-__-__"/>
          <div className={[styles.validation, styles['validation--initial']].join(' ')}>
            <i class="far fa-question-circle" style={{margin: '0 10px'}}></i>
            <div style={{display: 'inline-block'}}>Обязательное поле</div>
          </div>

          <label htmlFor="city" className={'offset-3 col-3'}>Город:</label>
          <div className={['offset-3 col-4', styles['text-field'], styles['city-select']].join(' ')}>
            <select>
              <option></option>
              <option value="Москва">Москва</option>
              <option value="Хабаровск">Хабаровск</option>
              <option value="Чебоксары">Чебоксары</option>
            </select>
          </div>
          <br />

          <img className={'offset-3'} src="#" alt="Image preview"/><br /><br />
          <label className={[styles['image-button'], 'offset-3 col-2'].join(' ')}>
            <i class="fas fa-paperclip" style={{marginRight: '5px'}}></i>Прикрепить фото
            <input type="file" onChange={this.loadImage}/>
          </label>
          <br />

          <label className={[styles['submit-button'], 'offset-3 col-1'].join(' ')}>Подать
            <input  type="submit"/>
          </label>
        </form>
    );
  }
}
