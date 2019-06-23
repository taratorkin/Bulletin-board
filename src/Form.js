import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v4';
import styles from './css/form.min.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.initialState = {
      headline: '',
      text: '',
      phone: '',
      image: '',
      imageName: '',
      formErrors: {headline: '', phone: ''},
      headlineValid: false,
      textValid: false,
      phoneValid: false,
      formValid: false
    };
    this.state = this.initialState
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let headlineValid = this.state.headlineValid;
    let textValid = this.state.textValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'headline':
        headlineValid = value.length > 0;
        fieldValidationErrors.headline = headlineValid ? 'correct' : 'empty';
        break;

      case 'text':
        textValid = value.length > 0;
        fieldValidationErrors.text = textValid ? 'correct' : 'empty';
        break;

      case 'phone':
        if(value.length > 0) {
          if(value.search(/\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/) === 0) {
            phoneValid = true;
            fieldValidationErrors.phone = 'correct';
          } else {
            fieldValidationErrors.phone = 'error';
          }
        } else {
          fieldValidationErrors.phone = 'empty';
        }
        break;

      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      headlineValid: headlineValid,
      textValid: textValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.headlineValid && this.state.textValid && this.state.phoneValid
    });
  }

  loadImage(e) {
    let reader  = new FileReader();
    let name = e.target.value;
    name = name.replace(/.*[\/\\]/, '');

    reader.onloadend = () => {
      this.setState({image: reader.result, imageName: name});
      this.image.src = reader.result;
    }

    if (this.imageInput.files[0]) {
      reader.readAsDataURL(this.imageInput.files[0]);
    } else {
      this.image.src = "";
    }
  }

  deleteImage() {
    this.imageInput.value = '';
    this.image.src = '#';
    this.setState({image: '', imageName: ''});
  }

  handleForm(e) {
    e.preventDefault();

    if(this.props.editMode) {
      this.props.callback({ id: this.props.item.id, headline: this.state.headline, text: this.state.text, phone: this.state.phone,
        image: this.state.image, editMode: true});
    } else {
      this.props.callback({ id: uuid(), headline: this.state.headline, text: this.state.text, phone: this.state.phone, image: this.state.image });
    }

    this.setState({ ...this.initialState });
  }

  render() {
    let headlineInput;
    let textInput;
    let phoneInput;
    let imageText;
    let image;

    if(this.state.imageName) {
      imageText = <Fragment>
        <p className={styles.image__text__name}>{this.state.imageName}</p>
        <p className={styles.image__text__delete} onClick={this.deleteImage}>Удалить</p>
      </Fragment>;
      image = <img src="#" ref={elem => { this.image = elem }}/>;
    } else {
      imageText = '';
      image = '';
    }

    switch(this.state.formErrors.headline) {
      case 'correct':
        headlineInput = <div className={[styles['validation'], styles['validation--correct']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="far fa-check-circle"></i></div>
          <div style={{display: 'inline-block'}}>Заполнено</div>
        </div>;
        break;
      case 'empty':
        headlineInput = <div className={[styles['validation'], styles['validation--error']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="fas fa-exclamation-circle"></i></div>
          <div style={{display: 'inline-block'}}>Заполните поле</div>
        </div>;
        break;
      default:
        headlineInput = <div className={[styles['validation'], styles['validation--initial']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="far fa-question-circle"></i></div>
          <div style={{display: 'inline-block'}}>Обязательное поле<br />Не более 140 символов</div>
        </div>;
    }

    switch(this.state.formErrors.text) {
      case 'correct':
        textInput = <div className={[styles['validation'], styles['validation--correct']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="far fa-check-circle"></i></div>
          <div style={{display: 'inline-block'}}>Заполнено</div>
        </div>;
        break;
      case 'empty':
        textInput = <div className={[styles['validation'], styles['validation--error']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="fas fa-exclamation-circle"></i></div>
          <div style={{display: 'inline-block'}}>Заполните поле<br />Не более 300 символов</div>
        </div>;
        break;
      default:
        textInput = <div className={[styles['validation'], styles['validation--initial']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="far fa-question-circle"></i></div>
          <div style={{display: 'inline-block'}}>Обязательное поле<br />Не более 300 символов</div>
        </div>;
    }

    switch(this.state.formErrors.phone) {
      case 'correct':
        phoneInput = <div className={[styles['validation'], styles['validation--correct']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="far fa-check-circle"></i></div>
          <div style={{display: 'inline-block'}}>Заполнено</div>
        </div>;
        break;
      case 'empty':
        phoneInput = <div className={[styles['validation'], styles['validation--error']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="fas fa-exclamation-circle"></i></div>
          <div style={{display: 'inline-block'}}>Заполните поле</div>
        </div>;
        break;
      case 'error':
        phoneInput = <div className={[styles['validation'], styles['validation--error']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="fas fa-exclamation-circle"></i></div>
          <div style={{display: 'inline-block'}}>Неверный формат</div>
        </div>;
        break;
      default:
        phoneInput = <div className={[styles['validation'], styles['validation--initial']].join(' ')}>
          <div className={styles['validation__wrapper']}><i class="far fa-question-circle"></i></div>
          <div style={{display: 'inline-block'}}>Обязательное поле</div>
        </div>;
    }
    return (
        <form onSubmit={this.handleForm}>
          <p className={[styles['top-text'], 'offset-3 col-3'].join(' ')}>Подать объявление</p>

          <label htmlFor="headline" className={'offset-3 col-3'}>Заголовок:</label>
          <input className={[styles['text-field'], 'offset-3 col-4', styles[this.state.formErrors.headline]].join(' ')} type="text" name="headline"
            value={this.state.headline} maxLength="140" onChange={this.handleInput}/>
          {headlineInput}

          <label htmlFor="text" className={'offset-3 col-3'}>Текст объявления:</label>
          <textarea className={[styles['text-field'], styles.description, 'offset-3 col-4', styles[this.state.formErrors.text]].join(' ')} name="text"
            value={this.state.text} maxLength="300" onChange={this.handleInput}/>
          {textInput}

          <label htmlFor="phone" className={'offset-3 col-3'}>Телефон:</label>
          <input className={[styles['text-field'], 'offset-3 col-4', styles[this.state.formErrors.phone]].join(' ')}
            type="tel" name="phone" value={this.state.phone}
            maxLength="18" placeholder="+7 (___) ___-__-__" onChange={this.handleInput}/>
          {phoneInput}

          <label className={[styles['image-button'], 'offset-3 col-2'].join(' ')}>
            <i class="fas fa-paperclip" style={{marginRight: '5px'}}></i>Прикрепить фото
            <input type="file" onChange={this.loadImage} ref={elem => { this.imageInput = elem }}/>
          </label>
          <div className={['offset-3 col-2', styles.image__wrapper].join(' ')}>
            <div className={['col-6', styles.image__img].join(' ')}>
              {image}
            </div>
            <div className={['col-6', styles.image__text].join(' ')}>
              {imageText}
            </div>
          </div>

          <label className={[styles['submit-button'], 'offset-3 col-1'].join(' ')}>Подать
            <input style={{marginTop: '20px'}} type="submit" disabled={!this.state.formValid}/>
          </label>
        </form>
    );
  }
}
