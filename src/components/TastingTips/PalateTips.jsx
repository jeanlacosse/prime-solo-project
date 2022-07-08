import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PalateTips() {

    const history = useHistory();

    return (
        <>
            <h2>How to judge palate of wine:</h2>
            <div>Things to look for:
                <div>Sweetness: dry - off-dry - medium-dry - medium-sweet - sweet - luscious</div>
                <div>Acidity: low - medium - high</div>
                <div>Tannin: low - medium - high</div>
                <div>Alcohol: low - medium - high</div>
                <div>Body: light - medium - full</div>
                <div>Finish: short - medium - long</div>
                <div>Flavour Characteristics: What does the wine taste like? Think sweet, salty, savory etc.</div>
            </div>
            <button
                onClick={() => { history.push('/tasting-tips') }}>
                Back</button>
        </>
    )
};

export default PalateTips;