import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


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
            {/* need to link this button to tips when I build out the tips page */}
            <button>
                <Link to="/appearance-tips">
                How to Judge Appearance
                </Link>
            </button>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                {/* slider input to change appearance rating */}
                <input
                    type="range"
                    min='0'
                    max='10'
                    value={appearanceRatingAndNotes.appearanceRating}
                    onChange={event => setAppearanceRatingAndNotes({
                        ...appearanceRatingAndNotes, appearanceRating: (Number(event.target.value))
                    })}
                />
                <h5>{appearanceRatingAndNotes.appearanceRating}</h5>

                {/* text box for tasting notes */}
                <input
                    type="text"
                    placeholder='Notes on wines appearance'
                    onChange={event => setAppearanceRatingAndNotes({
                        ...appearanceRatingAndNotes, appearanceNotes: (event.target.value)
                    })}
                />
                <button
                    onClick={() => { history.push('/new-tasting') }}
                >Back</button>
                <button type='submit'>Next</button>
                {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
            </form>
            <h5>Want your friends to rate this wine?
                <Popup
                    trigger={<button>QR Code to Share</button>}>
                    <div className='popup'><img src={qrCode} /></div>
                </Popup>
            </h5>
        </>
    )
};

export default AppearanceRating;