import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../App/App.css';

import Button from '@mui/material/Button';

function SuccessPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    let [qrCode, setQrCode] = useState('');

    useEffect(() => {
        setQR();
        dispatch({ type: 'FETCH_RATINGS_AND_INFO', payload: id });
    }, [id])

    const allWineInfo = useSelector((store) => store.wineInfo.allInfoRatingsAndNotes);

    // this will set the qr code to bring others to the beginning of the rating pages for this specific wine
    const setQR = () => {
        axios.get(`/api/wineInfo/${id}/qrCode`)
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
            <h3>Wine Ratings For:</h3>
            <h4>{allWineInfo.vintage} {allWineInfo.winery_name} {allWineInfo.varietal} from {allWineInfo.region}</h4>
            <div className='body-text'>The appearance rating for this wine is <div className='body-text'>{Number(allWineInfo.avg_appearance).toFixed(2)}</div></div>
            <div className='body-text'>The nose rating for this wine is <div className='body-text'>{Number(allWineInfo.avg_nose).toFixed(2)}</div></div>
            <div className='body-text'>The palate rating for this wine is <div className='body-text'>{Number(allWineInfo.avg_palate).toFixed(2)}</div></div>
            <div className='body-text'>The overall rating for this wine is <div className='body-text'>{Number(allWineInfo.avg_overall).toFixed(2)}</div></div>

            <h5>Tasting with friends?
                <div>
                    <Popup
                        trigger={<Button
                            sx={{
                                marginTop: '15px'
                            }}
                            color="secondary"
                            variant="contained">
                            Share with QR Code</Button>}>
                        <div className='popup'><img src={qrCode} /></div>
                    </Popup>
                </div>
            </h5>
            <Button
             onClick={() => {
                history.push('/wine-journal');
            }}
                sx={{
                    height: '50px'
                }}
                type='submit'
                color="primary"
                size='large'

                variant="contained">
                To Wine Journal</Button>
            
        </>
    )
};

export default SuccessPage;