import React, { useState } from "react";
import styles from "./FormFeedbeak.module.css";
import logo_camera from "../../assets/icon_camera.svg";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ImageFeedback from "../ImageFeedback";

const FormFeedbeak = ({ textFeedbeak, onChangeText, onChangeRati, countStar, onClickCam }) => {

    const [onShow, setOnShow] = useState(true);
    const handleStylesShow = () => {setOnShow(false)};

    return (
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
                        <input type="checkbox" name="answer" value="answer" className={styles.inputBox} />
                </label>
                <Link to='/photo'>
                    <div  onChange={onClickCam} className={styles.imgCamera}>
                        <img src={logo_camera} alt="CAMERA"  />
                    </div>
                </Link>
                <textarea name="feedbeak" className={styles.feedbeakText} value={textFeedbeak} onChange={onChangeText} placeholder="feedbeak"></textarea>
                <p className={` ${
                    onShow ? styles.noShow : styles.textShow
                }`
                } >
                    Enter stars and (or) write feedback (write more than 10 letters less than 150)
                </p>
                {((countStar > 0) && ((textFeedbeak.length == 0) || (textFeedbeak.length > 10) && (textFeedbeak.length < 150)))
                    ? <div className={styles.sendButton} >
                            <Link to='/report'><strong>SEND</strong></Link>
                      </div>
                    : <div className={styles.sendButton} onClick={handleStylesShow}><strong>SEND</strong></div>
                }
            </form>
        </div>

    );
}
export default FormFeedbeak;