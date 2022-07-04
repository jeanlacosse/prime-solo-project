const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios')

router.post('/', (req, res) => {
    console.log('ratings are', req.body);
    let queryText = `
    INSERT INTO "fourth_of_july_ratings"
    ("hotdogs", "fireworks", "vacation", "watermelon")
    VALUES ($1, $2, $3, $4);
    `;

    pool.query(queryText,
        [
            req.body.howManyHotDogsEaten,
            req.body.howGoodFireworks,
            req.body.howBadNeedVacation,
            req.body.howMuchLikeWatermelon
        ])
        .then(result => {
            res.sendStatus(201)
        })
        .catch(error => {
            console.error('error adding in ratings', error);
            res.sendStatus(500)
        });

        
});

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