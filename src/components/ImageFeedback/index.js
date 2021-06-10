import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import styles from './ImageFeedback.module.css';
import {Link} from 'react-router-dom';

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: '1024px',
    height: 'auto',
    facingMode: {exact : 'environment'},
};

const ImageFeedback = ({ setSrcImg, srcImg }) => {
    const webcamRef = useRef(null);

    const handlePhoto = useCallback(
        () => {
            const imageScr = webcamRef.current.getScreenshot();
            setSrcImg(imageScr);
        },
        [webcamRef]
    );

    const handleNewPhoto = () => {setSrcImg('');}

    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);

    const handleDevices = useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({kind}) => kind ==='videoinput')),
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );


    return (
        <>
        {devices.map((device, key) => (
        <div className={styles.container}>
            { srcImg == ''
                ? <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat={'image/jpeg'}
                    videoConstraints={{deviceId: device.deviceId}} />
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
            {device.label ||`Device ${key = 1}`}
        </div>
    
        ))};
        </>
    );
};

export default ImageFeedback;