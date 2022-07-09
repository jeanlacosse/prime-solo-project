import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '@mui/material/Button';


function AppearanceRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [appearanceRatingAndNotes, setAppearanceRatingAndNotes] = useState({
        appearanceRating: 5,
        appearanceNotes: ''
    });

    let [qrCode, setQrCode] = useState('');

    useEffect(() => {
        // this is to fetch wine detail for the id of teh url endpoint
        setQR();
        dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
    }, [id]);

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

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

    const addNotesAndRating = (event) => {
        event.preventDefault();

        // sends local state to store, not sent through a saga yet
        dispatch({
            type: 'ADD_APPEARANCE_INFO',
            payload: appearanceRatingAndNotes
        })
        // push to next page
        history.push(`/nose-rating/${id}`)
    }

    return (
        <>
            <h4>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h4>
            <h3>Appearance Rating</h3>
            {/* popup for seeing wine tasting tips in a modal */}
            <Popup
                trigger={<Button
                    color="secondary"
                    variant="outlined">
                    How to Judge Appearance</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge appearance of wine:</h2>
                    <div>Things to look for:
                        <div>Clarity: is it clear, hazy, somewhere in between? Is there any sediment?</div>
                        <div>Intensity: How deep is the color? Think on a scale of pale - medium - deep color </div>
                        <div>Color: What is the actual color of the wine? Try to be specific. Some colors to use are:
                            <div>White wine: lemon-green - lemon - gold - amber - brown</div>
                            <div>Rose wine: pink - salmon - orange</div>
                            <div>Red wine: purple - ruby - garnet - tawny - brown</div>
                        </div>
                    </div>

                </div>
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                {/* slider input to change appearance rating */}
                <div>Poor
                    <input
                        type="range"
                        min='0'
                        max='10'
                        value={appearanceRatingAndNotes.appearanceRating}
                        onChange={event => setAppearanceRatingAndNotes({
                            ...appearanceRatingAndNotes, appearanceRating: (Number(event.target.value))
                        })}
                    />
                    Outstanding
                </div>
                <h5>{appearanceRatingAndNotes.appearanceRating}</h5>

                {/* text box for tasting notes */}
                <input
                    type="text"
                    placeholder='Notes on wines appearance'
                    onChange={event => setAppearanceRatingAndNotes({
                        ...appearanceRatingAndNotes, appearanceNotes: (event.target.value)
                    })}
                />
                <div>
                    <Button
                        sx={{
                            marginRight: '8px',
                            width: '25%',
                            height: '50px'
                        }}
                        className="button"
                        type="button"
                        color="primary"
                        onClick={() => history.push('/new-tasting')}
                        variant="outlined">
                        Back</Button>
                    <Button
                        sx={{
                            marginLeft: '8px',
                            width: '25%',
                            height: '50px'
                        }}
                        type='submit'
                        color="primary"

                        variant="contained">
                        Next</Button>
                </div>
            </form>
            <h5>Tasting with Friends?
                <div>
                    <Popup
                        trigger={
                            <Button
                            sx={{
                                marginTop: '15px'
                            }}
                                color="secondary"
                                variant="contained">
                                Share with QR Code</Button>
                        }>
                        <div className='popup'><img src={qrCode} /></div>
                    </Popup>
                </div>
            </h5>
        </>
    )
};

export default AppearanceRating;