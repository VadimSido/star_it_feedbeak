import React, {useState} from "react";
import styles from "./FormFeedbeak.module.css";
import logo_camera from "../../assets/icon_camera.svg";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const FormFeedbeak = ({textFeedbeak, onChangeText, onChangeRati, countStar}) => {
    return(
        <div className={styles.container}>
            <div className={styles.containerRating}>
                <h3>RATING</h3>
                <ReactStars
                    classNames={styles.rating}
                    count={5}
                    value={countStar}
                    onChange={onChangeRati}
                    size={54}
                    activeColor="#ffd700"
                />
            </div>
            <form className={styles.containerForm}>
                <label className={styles.labelBox}>
                    I want to get answer
                    <input type="checkbox" name="answer" value="answer"  className={styles.inputBox} />
                </label>
                <button className={styles.imgCamera} disabled>
                  <img src={logo_camera} alt="CAMERA" />
                </button>
                <textarea name="feedbeak" className={styles.feedbeakText} value={textFeedbeak} onChange={onChangeText} placeholder="feedbeak"></textarea>
                {((countStar > 0) && ((textFeedbeak.length == 0) || (textFeedbeak.length > 10) && (textFeedbeak.length < 150)))
                    ? <button className={styles.sendButton} ><Link to='/report'><strong>SEND</strong></Link></button>
                    : <button className={styles.sendButton} disabled><strong>SEND</strong></button>
                }
            </form>
        </div>
    );
}
export default FormFeedbeak;