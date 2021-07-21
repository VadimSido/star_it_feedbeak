import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import styles from "./ThanksForReview.module.css";

const ThankForReview = ({ countStar, logo_bisnesses, srcImg, feedback, setTextFeedbeak, setCountStar }) => {

    const [error, setError] = useState(null);
{/*    const formdata = new FormData;
    formdata.append("image", {srcImg});
    
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedbeakToJson })
        };
        fetch("https://starit-api.herokuapp.com/api/feedback", requestOptions)
            .then(res => console.log(res.json))
            .then(
                (res) => { console.log(res) },
                (error) => {
                    setError(error)
                },
            );
    }, []);
*/}

    useEffect(() => {
        const optionRequest = {
            method: 'POST',

            body: feedback,
            redirect: 'follow'
        };
        fetch("https://starit-api.herokuapp.com/api/feedback", optionRequest)
            .then(res => {setTextFeedbeak('');
                          setCountStar(0)  })
            .then(
                (res) => {console.log(res)},
                (error) => {setError(error)},
            );
    },[]);

    if (error) {
        return <div>Error: {error.message}</div>
    }
    else {
        return (
            <div className={styles.container}>
                <div className={styles.containerReview}>
                    <p>Thank you for your review of our work!</p>
                    <img src={logo_bisnesses} className={styles.reviewImg} alt="LOGO" />
                </div>
                <div className={styles.containerWish}>
                    <p>We will respect your wishes and comments and will notify you of the <span>results!</span></p>
                </div>
                <div className={styles.containerRating}>
                    <p>your score</p>
                    <ReactStars
                        classNames={styles.rating}
                        count={5}
                        value={countStar}
                        size={54}
                        edit={false}
                        activeColor="#ffd700"
                    />
                </div>
            </div>
        );
    };
}

export default ThankForReview;