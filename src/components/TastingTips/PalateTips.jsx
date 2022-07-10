import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';

function PalateTips() {

    const history = useHistory();

    return (
        <>
            <h2>How to judge palate of wine:</h2>
            <div className='body-text'>Things to look for:
                <div className='body-text'>Sweetness: dry - off-dry - medium-dry - medium-sweet - sweet - luscious</div>
                <div className='body-text'>Acidity: low - medium - high</div>
                <div className='body-text'>Tannin: low - medium - high</div>
                <div className='body-text'>Alcohol: low - medium - high</div>
                <div className='body-text'>Body: light - medium - full</div>
                <div className='body-text'>Finish: short - medium - long</div>
                <div className='body-text'>Flavour Characteristics: What does the wine taste like? Think sweet, salty, savory etc.</div>
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

export default PalateTips;