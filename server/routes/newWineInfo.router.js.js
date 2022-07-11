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

router.post('/ratings', (req, res) => {
    console.log('wine ratings is ', req.body);
    // console.log('user id is', req.user.id);

    // want to post all info returning *, then fetch detail again and select averages
    let queryText = `
    INSERT INTO "scores" ("journal_entry_id", "appearance_score", "nose_score", "palate_score", "overall_score", "appearance_notes", "nose_notes", "palate_notes", "overall_notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;

    let queryParams = [
        req.body.journal_entry_id,
        req.body.appearanceRating,
        req.body.noseRating,
        req.body.palateRating,
        req.body.overallRating,
        req.body.appearanceNotes,
        req.body.noseNotes,
        req.body.palateNotes,
        req.body.overallNotes
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows[0]);

        })
        .catch(error => {
            console.error('error adding in ratings', error);
            res.sendStatus(500)
        });
})


// this is fetching the next wine id in order to create a linked page to it so I can 
// create a specific qr code for each api endpoint
router.get('/wine-id', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `
    SELECT MAX(Id) FROM journal_entry
    WHERE user_id = $1;
    `;

    pool.query(sqlQuery, [req.user.id])
        .then(result => {
            // this allows a max to be sent even if the DB is empty
            if (result.rows[0].max < 1) {
                res.send({ max: 1 })
            }
            else {
                res.send(result.rows[0]);
            }

        })
        .catch(error => {
            console.log('error in get request', error)
            res.sendStatus(500);
        })
})

router.get('/:id/info', (req, res) => {

    const sqlQuery = `
    SELECT * FROM journal_entry 
    WHERE id = $1;
    `;

    sqlParams = [
        req.params.id,
        // req.user.id
    ]

    pool.query(sqlQuery, sqlParams)
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('error in get request', error)
            res.sendStatus(500);
        })

})


// here is where i am getting the rating average from the server
router.get('/:id/ratings_info', (req, res) => {
    // console.log('req.user.id is', req.user.id)
    console.log('req.params.id is', req.params.id)

    const sqlQuery = `
    SELECT 
    journal_entry.id,
	journal_entry.date,
	journal_entry.winery_name,
	journal_entry.varietal,
	journal_entry.vintage,
	journal_entry.region,
	AVG(scores.appearance_score) AS avg_appearance,
	AVG(scores.nose_score) AS avg_nose,
	AVG(scores.palate_score) AS avg_palate,
	AVG(scores.overall_score) AS avg_overall,
    array_agg(scores.appearance_notes) AS appearNotes,
	array_agg(scores.nose_notes) AS noseNotes,
	array_agg(scores.palate_notes) AS palateNotes,
	array_agg(scores.overall_notes) AS overallNotes
FROM journal_entry
JOIN scores
	ON journal_entry.id = scores.journal_entry_id
	WHERE journal_entry.id = $1
	GROUP BY journal_entry.id;
    `;

    pool.query(sqlQuery, [req.params.id])
        .then(result => {
            // console.log('result is', result.rows);
            res.send(result.rows[0]);
        })
        .catch(err => {
            console.error('error in getting average ratings', err);
            res.sendStatus(500);
        })
})

router.get('/:id/qrCode', (req, res) => {
    // add req.params into the params for qr code
    axios({
        method: 'GET',
        url: 'https://api.qrserver.com/v1/create-qr-code/',
        params: {
            data: `http://localhost:3000/#/appearance-rating/${req.params.id}`
            // `https://serene-lassen-volcanic-92087.herokuapp.com/#/appearance-rating/${req.params.id}`
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

// here is where i am getting all wines back from server
router.get('/all', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `
    SELECT 
    journal_entry.id,
	journal_entry.date,
	journal_entry.winery_name,
	journal_entry.varietal,
	journal_entry.vintage,
	journal_entry.region,
    journal_entry.favorited,
	AVG(scores.appearance_score) AS avg_appearance,
	AVG(scores.nose_score) AS avg_nose,
	AVG(scores.palate_score) AS avg_palate,
	AVG(scores.overall_score) AS avg_overall
FROM journal_entry
JOIN scores
	ON journal_entry.id = scores.journal_entry_id
    WHERE journal_entry.user_id = $1
	GROUP BY journal_entry.id;
    `;

    pool.query(sqlQuery, [req.user.id])
        .then(result => {
            // console.log('result is', result.rows);
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting average ratings', err);
            res.sendStatus(500);
        })
})

router.delete('/:id/delete', rejectUnauthenticated, (req, res) => {

    const queryText = `
    DELETE FROM journal_entry
    WHERE id = $1
    AND user_id = $2;
    `;

    pool.query(queryText, [req.params.id, req.user.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.error('Error completing DELETE query', err);
            res.sendStatus(500);
        });
});

router.put('/:id/favorite', rejectUnauthenticated, (req, res) => {

    const queryText = `
    UPDATE journal_entry
    SET favorited = true
    WHERE id = $1
    AND user_id = $2;
    `;

    pool.query(queryText, [req.params.id, req.user.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.error('Error completing DELETE query', err);
            res.sendStatus(500);
        });
});

module.exports = router;