import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import ImageUploader from 'react-images-upload';
import styles from './ImageFeedback.module.css';
import { Link, Redirect } from 'react-router-dom';

const facingUser = 'user';
const facingEnvironment = 'environment'

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: '1024px',
    height: 'auto',
    facingMode: facingUser,
};
const fileContainerStyle = {
    background: 'none',
    boxShadow: 'none',
};
const buttonStyles = {
    background: '#43b6da',
    width: '50vw',
    height: '100px',
    color: '#d9ebde',
    fontSize: '20px',
}

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
                    ? <div className={styles.containerBox}>
{/*                        {(!onCamera)
                        ?<div className={styles.containerBox}>
                            <div>
                                <button
                                    className={styles.photoButton}
                                    onClick={handleOnCamera}>
                                    Camera
                            </button>
</div>*/}
                            <div>
                                <ImageUploader
                                    fileContainerStyle={fileContainerStyle}
                                    buttonStyles={buttonStyles}
                                    withIcon={true}
                                    buttonText='Choose image'
                                    onChange={onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    
                                />
                            </div>
                    </div>    
                    : (((srcImg.length!==0) && (JSON.stringify(srcImg[0]) === JSON.stringify(imagePhoto)))||
                    ((srcImg.length>1) && (JSON.stringify(srcImg[1]) === JSON.stringify(imagePhoto)))) 
                        ? <div className={styles.containerBoxDouble}>
                            <h4>such a picture is duplicated</h4>
                            <button
                                    className={styles.photoButton}
                                    onClick={handleNewPhoto}>
                                    OK
                            </button>
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
                                    New picture
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