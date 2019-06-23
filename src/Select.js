import React, { Component } from 'react';

import styles from './css/select.min.css';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.cancelSelection = this.cancelSelection.bind(this);
    this.state = {
      items: this.props.items || [],
      showItems: false,
      selectedItem: {value: ''},
    }
  }


  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item,
      showItems: false,
    }, () => {
      this.props.callback(this.state.selectedItem);
    })
  }

  cancelSelection() {
    this.setState({
      selectedItem: { value: ''}
    }, () => {
      this.props.callback(this.state.selectedItem);
    });
  }

  render() {
    return <div className={['offset-3 col-4', styles.wrapper].join(' ')}>
      <div className={styles['select-box--box']}>
        <div className={styles['select-box--container']}>
          <div className={styles['select-box--selected-item']}>
            { this.state.selectedItem.value }
          </div>
          <div className={styles['select-box--close']} onClick={this.cancelSelection}>
            <i style={{display: this.state.selectedItem.value === '' ? 'none' : 'inline-flex'}} className="fas fa-times"></i>
          </div>
          <div
            className={styles['select-box--arrow']}
            onClick={this.dropDown}
          ><i className={this.state.showItems ? ['fas fa-chevron-up', styles['select-box--arrow']].join(' ')
          : ['fas fa-chevron-down', styles['select-box--arrow']].join(' ')}/></div>
        </div>
        <div
          className={styles['select-box--items']}
          style={{display: this.state.showItems ? 'block' : 'none'}}
        >
          {
            this.state.items.map(item => <div
              key={item.id}
              onClick={() => this.selectItem(item)}
              className={this.state.selectedItem === item ? styles.selected : ''}
            >
              { item.value }
            </div>)
          }
        </div>
      </div>
      <input type='hidden' name={this.state.name} value={this.state.selectedItem.id} />
    </div>
  }
}
