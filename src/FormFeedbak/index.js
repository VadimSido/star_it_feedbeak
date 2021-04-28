import React from "react";
import styles from "./FormFeedbeak.module.css";
import logo_camera from "../assets/icon_camera.svg";
import {Link} from "react-router-dom";

const FormFeedbeak = ({value, onChange}) => {
    return(
        <div className={styles.container}>
            <form className={styles.containerForm}>
                <label className={styles.labelBox}>
                    I want to get answer
                    <input type="checkbox" name="answer" value="answer"  className={styles.inputBox} />
                </label>
                <button className={styles.imgCamera}>
                  <img src={logo_camera} alt="CAMERA" />
                </button>
                <textarea name="feedbeak" className={styles.feedbeakText} value={value} onChange={onChange} placeholder="feedbeak"></textarea>
                <button className={styles.sendButton}><Link to="/report"><strong>SEND</strong></Link></button>
            </form>
        </div>
    );
}
export default FormFeedbeak;