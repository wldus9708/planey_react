import React from "react";
import styles from "./shopDetail.module.css";
import image1 from "../../Assets/Forest.jpg";
import image2 from "../../Assets/Forest.jpg";
import image3 from "../../Assets/Forest.jpg";
import image4 from "../../Assets/Forest.jpg";

import { useState } from "react";

const ShopDetail = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 4 ? 1 : currentSlide + 1);
  };
  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <input
            className={styles.input}
            type="radio"
            name="slide"
            id="c1"
            checked={currentSlide === 1}
          />
          <label
            htmlFor="c1"
            className={styles.card}
            style={{ backgroundImage: `url(${image1})` }}
            onClick={nextSlide}
          >
            <div className={styles.row}>
              <div className={styles.icon}>1</div>
              <div className={styles.description}>
                <h4>Winter</h4>
                <p>Winter has so much to offer - creative activities</p>
              </div>
            </div>
          </label>
          <input
            className={styles.input}
            type="radio"
            name="slide"
            id="c2"
            checked={currentSlide === 2}
          />
          <label
            htmlFor="c2"
            className={styles.card}
            style={{ backgroundImage: `url(${image2})` }}
            onClick={nextSlide}
          >
            <div className={styles.row}>
              <div className={styles.icon}>2</div>
              <div className={styles.description}>
                <h4>Digital Technology</h4>
                <p>Gets better every day - stay tuned</p>
              </div>
            </div>
          </label>
          <input
            className={styles.input}
            type="radio"
            name="slide"
            id="c3"
            checked={currentSlide === 3}
          />
          <label
            htmlFor="c3"
            className={styles.card}
            style={{ backgroundImage: `url(${image3})` }}
            onClick={nextSlide}
          >
            <div className={styles.row}>
              <div className={styles.icon}>3</div>
              <div className={styles.description}>
                <h4>Globalization</h4>
                <p>Help people all over the world</p>
              </div>
            </div>
          </label>
          <input
            className={styles.input}
            type="radio"
            name="slide"
            id="c4"
            checked={currentSlide === 4}
          />
          <label
            htmlFor="c4"
            className={styles.card}
            style={{ backgroundImage: `url(${image4})` }}
            onClick={nextSlide}
          >
            <div className={styles.row}>
              <div className={styles.icon}>4</div>
              <div className={styles.description}>
                <h4>New technologies</h4>
                <p>Space engineering becomes more and more advanced</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
