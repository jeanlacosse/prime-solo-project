import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function SuccessPage() {

    let [qrCode, setQrCode] = useState('');
    const allWineInfo = useSelector((store) => store.wineInfo.allInfoRatingsAndNotes);

    useEffect(() => {
        setQR();
    })

    const history = useHistory();

    const setQR = () => {
        axios.get(`/api/wineInfo/${allWineInfo.id}/qrCode`)
            .then(response => {
                // console.log('response is', response.data.qrCode)
                setQrCode(response.data.qrCode);

            })
            .catch((err) => {
                console.error('problem setting QR code', err)
            })
    }

    return (
        <>
            <h3>Wine Ratings Submitted Successfully!</h3>
            <h4>{allWineInfo.vintage} {allWineInfo.winery_name} {allWineInfo.varietal} from {allWineInfo.region}</h4>
            <div>The appearance rating for this wine is {Number(allWineInfo.avg_appearance).toFixed(2)}</div>
            <div>The nose rating for this wine is {Number(allWineInfo.avg_nose).toFixed(2)}</div>
            <div>The palate rating for this wine is {Number(allWineInfo.avg_palate).toFixed(2)}</div>
            <div>The overall rating for this wine is {Number(allWineInfo.avg_overall).toFixed(2)}</div>

            <h5>Want your friends to rate this wine?
                <Popup
                    trigger={<button>Share</button>}>
                    <div className='popup'><img src={qrCode} /></div>
                </Popup>
            </h5>
        </>
    )
};

export default SuccessPage;