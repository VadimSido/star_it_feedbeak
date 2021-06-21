import React, { useState } from "react";
import styles from "./FormFeedbeak.module.css";
import logo_camera from "../../assets/icon_camera.svg";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ImageFeedback from "../ImageFeedback";

const FormFeedbeak = ({ textFeedbeak, onChangeText,
    onChangeRati, countStar, onClickCamera,
    cameraOn, srcImg, setSrcImg }) => {

    const deleteImage = (i) => {
                setSrcImg( oldArray => oldArray.filter((srcImg,index) => index !==i))
    };

    const imageScr = srcImg;
    const itemImg = imageScr.map((imgList, i) =>
        <div className={styles.imageItem} key={i}>
            <img src={imgList} alt='image' className={styles.imageBox} />
            <div className={styles.deleteImg} onClick={() => {deleteImage(i)}} >
                X
            </div>
        </div>
    );
    

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
                <div className={styles.imgBox}>
                    {cameraOn
                        ? <Link to='/photo'>
                            <div className={styles.imgCamera}>
                                <img src={logo_camera} alt="CAMERA" />
                            </div>
                        </Link>
                        : <div onClick={() => { onClickCamera(true) }} className={styles.imgCamera}>
                            <img src={logo_camera} alt="CAMERA" />
                        </div>}
                    <div className={styles.itemImg}>
                        {itemImg}
                    </div>
                </div>
                <textarea name="feedbeak" className={styles.feedbeakText} value={textFeedbeak} onChange={onChangeText} placeholder="feedbeak"></textarea>
                <p className={styles.textShow} >
                    Enter stars and (or) write feedback (write more than 10 letters less than 200)
                </p>
                {((countStar > 0) && ((textFeedbeak.length == 0) || (textFeedbeak.length > 10) && (textFeedbeak.length < 200)))
                    ? <div className={styles.sendButton} >
                        <Link to='/report'><strong>SEND</strong></Link>
                    </div>
                    : <div className={styles.sendButton}><strong>SEND</strong></div>
                }
            </form>
        </div>

    );
}
export default FormFeedbeak;