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
import logo_silpo from "../../assets/logo_silpo.png";
import ImageFeedback from '../ImageFeedback';


const QRcodePoint = () => {
    {/*    const {idBisnesses} = useParams();
    const {idPoint} = useParams();
    console.log(idBisnesses);
*/}
    const [countStar, setCountStar] = useState(0);
    const ratingChanged = (newRating) => {
        setCountStar(newRating);
    };

    const [textFeedbeak, setTextFeedbeak] = useState('');
    const onChangeFeedbeak = (e) => {
        setTextFeedbeak(e.target.value);
    };

    {/*    const urlBisnesses = 'www.star.it/api/business/' + idBisnesses; 
    const urlPoint = 'www.star.it/api/fbo/' + idBisnesses + '/' + idPoint; 
    */}
    const [error, setError] = useState(null);
    {/*    const [isLoaded, setIsLoaded] = useState(false); */ }
    const [isLoaded, setIsLoaded] = useState(true);
    const [bisnesses, setBisnesses] = useState({});

    {/*    useEffect(() => {
        fetch({urlBisnesses})
            .then(rez => rez.json())
            .then(
                (rezult) => {
                    setIsLoaded(true);
                    setBisnesses(rezult);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    },[])  */};

    let feedbeakToJson = {
        rate: countStar,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        text: textFeedbeak,
    };
    let jsonFeedbeak = JSON.stringify(feedbeakToJson);
    console.log(jsonFeedbeak);

    const [webcamOnOff, setWebcamOnOff] = useState(true);
    const cameraOnOff = (webcamOnOff) => {
        setWebcamOnOff(!webcamOnOff);
        console.log(webcamOnOff);
    };

    const [srcImg, setSrcImg] = useState('');
    console.log(srcImg);

    {/*if (error) {
        return <div>Error: {error.message}</div>
    }
        else if (!isLoaded) {
            return <div>Loading...</div>
        }
    else {    */}
    return (
        <Router>
            <Switch>
                <Route path="/info/silpo/334455">
                    <Feedbeak logo_bisnesses={logo_silpo} />
                    <FormFeedbeak
                        textFeedbeak={textFeedbeak}
                        onChangeText={onChangeFeedbeak}
                        onChangeRati={ratingChanged}
                        countStar={countStar}
                        onClickCam={cameraOnOff}
                        srcImg={srcImg}
                    />
                </Route>
                <Route path="/report">
                    <ThanksForReview
                        countStar={countStar}
                        logo_bisnesses={logo_silpo}
                        feedbeakToJson={feedbeakToJson} />
                </Route>
                <Route path="/photo">
                    <ImageFeedback
                        setSrcImg={setSrcImg}
                        srcImg={srcImg} />
                </Route>
            </Switch>
        </Router>

    );
}



export default QRcodePoint;