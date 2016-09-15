import React, {Component} from 'react';
import styles from './loading.scss';

export default class Loading extends Component {
  render() {

    return (
      <div className={styles.threeBounce}>
        <div className={`${styles.child} ${styles.bounce1}`}></div>
        <div className={`${styles.child} ${styles.bounce2}`}></div>
        <div className={`${styles.child} ${styles.bounce3}`}></div>
      </div>
    );
  }
}