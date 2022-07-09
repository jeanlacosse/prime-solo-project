import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function OverallTips() {

    const history = useHistory();

    return (
        <>
            <h2>How to judge a wines overall score:</h2>
            <div>Things to look for:
                <div>Quality level: How does the wine hold up to all the ratings given?</div>
                <div>faulty - poor - acceptable - good - very good - outstanding</div>
                <div>Level of readiness: 
                    too young - can drink now, but has potential for ageing - drink now, not suitable for ageing - too old
                </div>
            </div>
            <button
                onClick={() => { history.push('/tasting-tips') }}>
                Back</button>
        </>
    )
};

export default OverallTips;