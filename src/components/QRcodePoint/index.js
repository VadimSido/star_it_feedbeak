import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import Feedbeak from '../Feedbeak';
import { useParams } from "react-router-dom";
import ThanksForReview from "../ThanksForReview";
import FormFeedbeak from '../FormFeedbak';
import ImageFeedback from '../ImageFeedback';


const QRcodePoint = ({textFeedbeak, onChangeFeedbeak, setTextFeedbeak}) => {
    const {idBusiness} = useParams();
    const {idPoint} = useParams();

    const [countStar, setCountStar] = useState(0);
    const ratingChanged = (newRating) => {
        setCountStar(newRating);
    };


    const urlBusiness = 'https://starit-api.herokuapp.com/api/business/' + idBusiness; 
    const urlPoint = 'https://starit-api.herokuapp.com/api/fbo/' + idBusiness + '/' + idPoint;
    const pathRoute = '/info/' + idBusiness + '/' + idPoint;
     
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [business, setBusiness] = useState({});
    const [point, setPoint] = useState({});

    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessLogo, setBusinesLogo] = useState('');
    const [pointName, setPointName] = useState('');

    const [answer, setAnswer] = useState(false);
    
        useEffect(() => {
        fetch(urlBusiness)
            .then(rez => rez.json())
            .then(
                (rezult) => {
                    setIsLoaded(true);
                    setBusiness(rezult);
                    setBusinessName(rezult[0].name);
                    setBusinessAddress(rezult[0].address);
                    setBusinesLogo(rezult[0].logo);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    },[]);

    useEffect(() => {
        fetch(urlPoint)
            .then(rez => rez.json())
            .then(
                (rezult) => {
                    setIsLoaded(true);
                    setPoint(rezult);
                    setPointName(rezult[0].object_name);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    },[]);

    const date = new Date();
    const dateFeedback = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const feedback = new FormData;
    feedback.append('fbo_id',idPoint);
    feedback.append('stars',countStar);
    feedback.append('date',dateFeedback);
    feedback.append('comment',textFeedbeak);
    feedback.append('reaction_needed',answer);

    const [webcamOnOff, setWebcamOnOff] = useState(false);
    const [imagePhoto, setImagePhoto] = useState('');

    const [srcImg, setSrcImg] = useState([]);

    if (error) {
        return <div>Error: {error.message}</div>
    }
    else if (!isLoaded) {
            return <div>Loading...</div>
        }
    else {    
    return (
        <Router>
            <Switch>
                <Route path={pathRoute}>
                    <Feedbeak  
                        businessName={businessName}
                        businessAddress={businessAddress}
                        businessLogo={businessLogo}
                        pointName={pointName}
                    />
                    <FormFeedbeak
                        textFeedbeak={textFeedbeak}
                        setAnswer={setAnswer}
                        answer={answer}
                        onChangeText={onChangeFeedbeak}
                        onChangeRati={ratingChanged}
                        countStar={countStar}
                        onClickCamera={setWebcamOnOff}
                        cameraOn={webcamOnOff}
                        srcImg={srcImg}
                        setSrcImg={setSrcImg}
                    />
                </Route>
                <Route path="/report">
                    <ThanksForReview
                        countStar={countStar}
                        businessLogo={businessLogo}
                        feedback={feedback}
                        setTextFeedbeak={setTextFeedbeak}
                        setCountStar={setCountStar} />
                </Route>
                <Route path="/photo">
                    <ImageFeedback
                        pathRoute={pathRoute}
                        imagePhoto={imagePhoto}
                        setImagePhoto={setImagePhoto}
                        srcImg={srcImg}
                        setSrcImg={setSrcImg}
                    />
                </Route>
            </Switch>
        </Router>

    );
    };
}



export default QRcodePoint;