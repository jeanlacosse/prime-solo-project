import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';

function NoseTips() {

    const history = useHistory();

    return (
        <>
            <h2>How to judge nose of wine:</h2>
            <div className='body-text'>Things to look for:
                <div className='body-text'>Cleanliness: Is the smell crisp or does it smell unclean?</div>
                <div className='body-text'>Intensity: How intense is the smell of the wine? light - medium - pronounced </div>
                <div className='body-text'>Aroma Characteristics: What does the wine smell like? Try to be specific. A wine can have many different aromas.

                    <div className='body-text'>Please refer to the wine aroma wheel for some examples</div>
                    <div><img src="https://scalar.usc.edu/works/from-vine-to-wine/media/D-415-WineAromaWheel-ACNoble.jpg" alt="" /></div>
                </div>
            </div>
            <Button
                sx={{
                    marginTop: "20px",
                    width: '25%',
                    height: '50px'
                }}
                className="button"
                type="button"
                color="primary"
                onClick={() => history.push('/tasting-tips')}
                variant="outlined">
                Back</Button>

        </>
    )
};

export default NoseTips;         