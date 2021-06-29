import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import ImageUploader from 'react-images-upload';
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

const ImageFeedback = ({ imagePhoto, setImagePhoto, srcImg, setSrcImg, pathRoute }) => {
    const webcamRef = useRef(null);
    const [onCamera, setOnCamera] = useState(false);

    const [facingMode, setFacingMode] = useState(facingUser);
    const handleSwitchCamera = () => {
        setFacingMode(
            facingMode === facingUser
                ? facingEnvironment
                : facingUser
        );
    };

    const handlePhoto = useCallback(
        () => {
            const imageScr = webcamRef.current.getScreenshot();
            setImagePhoto(imageScr);
        },
        [webcamRef]
    );

    const handleNewPhoto = () => {
        setImagePhoto('');
        setOnCamera(false);
    };

    const handleOnCamera = () => {
        setOnCamera(true);
    }

    const addImgArray = () => {
        setSrcImg(oldArray => [...oldArray, imagePhoto]);
        setImagePhoto('');
    };

    const onDrop = (pictureFiles, pictureDataUrl) => {
        setImagePhoto(pictureDataUrl);
    };


    if (srcImg.length > 2) {
        return <div className={styles.noMorePhoto}>
            <p>photos cannot be more than 3</p>
            <button className={styles.sendButton} >
                <Link to={pathRoute}>BACK</Link>
            </button>
        </div>
    }
    else {
        return (
            <div>
                {imagePhoto == ''
                    ? <div>
                        {(!onCamera)
                        ?<div className={styles.containerBox}>
                            <div>
                                <button
                                    className={styles.photoButton}
                                    onClick={handleOnCamera}>
                                    Camera
                            </button>
                            </div>
                            <div>
                                <ImageUploader
                                    withIcon={false}
                                    buttonText='Choose image'
                                    onChange={onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </div>
                        </div>
                        : <div className={styles.container}>
                                <Webcam
                                    className={styles.img}
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat={'image/jpeg'}
                                    videoConstraints={{
                                        ...videoConstraints,
                                        facingMode
                                    }} />
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
                            }
                    </div>
                    : <div className={styles.container}>
                        <img src={imagePhoto} className={styles.img} />
                        <div className={styles.buttonPhoto}>
                            <button
                                className={styles.photoButton}
                                onClick={addImgArray}>
                                <Link to={pathRoute}>Save picture</Link>
                            </button>
                            <button
                                className={styles.photoButton}
                                onClick={handleNewPhoto}>
                                Create a new picture
                                    </button>
                        </div>
                    </div>
                }
            </div>
        )
    }

};

{/*return (
    <div>
    <ImageUploader
        withIcon={false}
        buttonText='Choose image'
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
    />
                                <button
                                className={styles.photoButton}
                                onClick={addImgArray}>
                                <Link to={pathRoute}>Save picture</Link>
                            </button>
</div>*/}



export default ImageFeedback;