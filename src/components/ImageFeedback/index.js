import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import styles from './ImageFeedback.module.css';
import {Link} from 'react-router-dom';

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: '1024px',
    height: 'auto',
    facingMode: 'user',
};

const ImageFeedback = ({ setSrcImg, srcImg }) => {
    const webcamRef = React.useRef(null);

    const handlePhoto = React.useCallback(
        () => {
            const imageScr = webcamRef.current.getScreenshot();
            setSrcImg(imageScr);
        },
        [webcamRef]
    );

    const handleNewPhoto = () => {setSrcImg('');}


    return (
        <div className={styles.container}>
            { srcImg == ''
                ? <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat={'image/jpeg'}
                    videoConstraints={videoConstraints} />
                : <img src={srcImg} />
            }
            <div className={styles.buttonPhoto}>
                <button
                    className={styles.photoButton}
                    onClick={handlePhoto}>
                    Take a picture
            </button>
                <button
                    className={styles.photoButton}
                    onClick={handleNewPhoto}>
                    Create a new picture
                </button>
            </div>
            <button className={styles.sendButton}>
                <Link to='/report'>Send picture</Link>
            </button>
        </div>
    );
};

export default ImageFeedback;