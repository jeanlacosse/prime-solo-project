const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.post('/new-wine', rejectUnauthenticated, (req, res) => {
    console.log('wine info is ', req.body);
    console.log('user id is', req.user.id);
    // this will post the entry to the DB while returning that information posted to be sent back to 
    // the saga, which is then used to set the store in the wine reducer
    let queryText = `
    INSERT INTO "journal_entry" ("user_id", "date", "winery_name", "varietal", "vintage", "region")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

    let queryParams = [
        req.user.id,
        req.body.date,
        req.body.winery_name,
        req.body.varietal,
        req.body.vintage,
        req.body.region
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows[0]);

        })
        .catch(error => {
            console.error('error adding in ratings', error);
            res.sendStatus(500)
        });
});

// this is fetching the next wine id in order to create a linked page to it so I can create aa specific qr code for each page
router.get('/wine-id', (req, res) => {
    const sqlQuery = `
    SELECT MAX(Id) FROM journal_entry;
    `;

    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('error in get request', error)
            res.sendStatus(500);
        })
})

// here is where i am getting the rating average from the server
router.get('/', (req, res) => {
    const sqlQuery = `
SELECT
    AVG(fourth_of_july_ratings.hotdogs) AS hotdogs_avg,
    AVG(fourth_of_july_ratings.fireworks) AS fireworks_avg,
    AVG(fourth_of_july_ratings.vacation) AS vacation_avg,
    AVG(fourth_of_july_ratings.watermelon) AS watermelon_avg
FROM fourth_of_july_ratings;
    `;

    pool.query(sqlQuery)
        .then(result => {
            console.log('result is', result.rows);
            res.send(result.rows[0]);
        })
        .catch(err => {
            console.error('error in getting average ratings', err);
            res.sendStatus(500);
        })
})

router.get('/qrCode', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://api.qrserver.com/v1/create-qr-code/',
        params: {
            data: 'https://serene-lassen-volcanic-92087.herokuapp.com/#/ratings'
        }
    })
        .then(apiRes => {
            // console.log('api res is ', apiRes.request.res.responseUrl);

            res.send({
                qrCode: apiRes.request.res.responseUrl
            })
        })
        .catch(err => {
            console.error('error in sending api req', err)
        })
})


module.exports = router;