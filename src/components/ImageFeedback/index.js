import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import styles from './ImageFeedback.module.css';
import { Link } from 'react-router-dom';

const facingUser = 'user';
const facingEnvironment = 'environment'

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: '1024px',
    height: 'auto',
    facingMode: facingUser,
};

const ImageFeedback = ({ imagePhoto, setImagePhoto, srcImg, setSrcImg }) => {
    const webcamRef = useRef(null);

    const [facingMode, setFacingMode] = useState(facingUser);
    const handleSwitchCamera = () => {
        setFacingMode(
            prevState =>
                prevState === facingUser
                    ? facingUser
                    : facingEnvironment
        );
    };

    const handlePhoto = useCallback(
        () => {
            const imageScr = webcamRef.current.getScreenshot();
            setImagePhoto(imageScr);
        },
        [webcamRef]
    );

    const handleNewPhoto = () => { setImagePhoto('') };

    const addImgArray = () => {
        setSrcImg(oldArray => [...oldArray, imagePhoto]);
        setImagePhoto('');
    };


    if (srcImg.length > 2) {
        return <div className={styles.noMorePhoto}>
            <p>photos cannot be more than 3</p>
            <button className={styles.sendButton} >
                <Link to='/info/silpo/334455'>BACK</Link>
            </button>
        </div>
    }
    else {
        return (
            <div className={styles.container}>
                {imagePhoto == ''
                    ? <div>
                        <Webcam
                            className={styles.img}
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat={'image/jpeg'}
                            videoConstraints={{
                                ...videoConstraints,
                                facingMode}} />
                        <div className={styles.buttonPhoto}>
                            <button
                                className={styles.photoButton}
                                onClick={handlePhoto}>
                                    Take a picture
                            </button>
                            <button
                                className={styles.photoButton}
                                onClick={handleSwitchCamera}>
                                    Switch camera
                            </button>
                        </div>
                    </div>
                    : <div>
                        <img src={imagePhoto} className={styles.img} />
                        <div className={styles.buttonPhoto}>
                            <button 
                                className={styles.photoButton} 
                                onClick={addImgArray}>
                                    <Link to='/info/silpo/334455'>Save picture</Link>
                            </button>
                            <button
                                className={styles.photoButton}
                                onClick={handleNewPhoto}>
                                    Create a new picture
                                </button>
                        </div>
                    </div>
                }
                {/*                <div className={styles.buttonPhoto}>
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
                            <button className={styles.sendButton} onClick={addImgArray}>
                                <Link to='/info/silpo/334455'>Save picture</Link>
            </button>*/}
            </div>
        );
    };
};

export default ImageFeedback;