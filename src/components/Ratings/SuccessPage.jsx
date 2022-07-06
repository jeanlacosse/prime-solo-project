import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SuccessPage() {
    let [qrCode, setQrCode] = useState('');
    // empty local state that is now being set in teh axios.get to have rating averages
    // as values for the object
    let [ratingAverages, setRatingAverage] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setQR();
        avgRating();
    }, [])

    const setQR = () => {
        axios.get('/api/wineInfo/qrCode')
            .then(response => {
                console.log('response is', response.data.qrCode)
                setQrCode(response.data.qrCode);

            })
            .catch((err) => {
                console.error('problem setting QR code', err)
            })
    }

    const avgRating = () => {
        axios.get('/api/wineInfo')
            .then(response => {
                console.log('response for rating is:', response.data)
                setRatingAverage({
                    ...ratingAverages,
                    avgHotDogs: response.data.hotdogs_avg,
                    avgFireworks: response.data.fireworks_avg,
                    avgVacation: response.data.vacation_avg,
                    avgWatermelon: response.data.watermelon_avg
                })

            })
            .catch((err) => {
                console.error('problem getting rating response', err)
            })
    }

    return (
        // displaying the averages grabbed from the db into the local state
        // these are turned to numbers and only allows two decimal places
        <>
            <h2>Submission Successful! </h2>
            <h3>The average number of hotdogs eaten this weekend is: {Number(ratingAverages.avgHotDogs).toFixed(2)}</h3>
            <h3>The class saw fireworks with an average rating of: {Number(ratingAverages.avgFireworks).toFixed(2)}</h3>
            <h3>The class needs a vacation this bad: {Number(ratingAverages.avgVacation).toFixed(2)}</h3>
            <h3>Gaiman lovoes watermelon this much: {Number(ratingAverages.avgWatermelon).toFixed(2)}</h3>
            <h4>Scan QR code to let others rate as well</h4>
            <img src={qrCode} alt="" />
            {/* <button
                onClick={() => { history.push('/') }}
            >Return to home
            </button> */}
        </>
    )
};

export default SuccessPage;