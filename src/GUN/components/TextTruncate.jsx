import React, { useState } from 'react';
import styles from './RentCarHead.module.css';

const TextTruncate = ({ text, limit }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className={styles.textContainer}> 
      <p className={styles.text}>
        {isTruncated ? `${text.slice(0, limit)}...` : text}
      </p>
      <button
      className={styles.rentCarCommentbtn}
      onClick={toggleTruncate}>
        {isTruncated ? '더보기' : '접기'}
      </button>
    </div>
  );
};

export default TextTruncate;
