import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';

function OverallTips() {

    const history = useHistory();

    return (
        <>
            <h2>How to judge a wines overall score:</h2>
            <div className='body-text'>Things to look for:
                <div className='body-text'>Quality level: How does the wine hold up to all the ratings given?</div>
                <div className='body-text'>faulty - poor - acceptable - good - very good - outstanding</div>
                <div className='body-text'>Level of readiness:
                    too young - can drink now, but has potential for ageing - drink now, not suitable for ageing - too old
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

export default OverallTips;