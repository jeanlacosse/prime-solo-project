# Project Name
Tasting Room - Solo Project

## Description
This project took two weeks to develop.

I wanted to create a full-stack application that would allow a user to create a group wine tasting with friends where everyone can review and rate the wine they are drinking together.

The goal was to build an application which utilizes the full stack in order to run database requests, render items to the dom, and create a responsive and immersive experience within the app.

## Screen Shots
<span>
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.06.37%20PM.png" style="width: 25%;">
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.06.49%20PM.png" style="width: 25%;">
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.07.26%20PM.png" style="width: 25%;">
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.07.59%20PM.png" style="width: 25%;">
  </span>

### Prerequisites

- PostgreSQL database connectivity
- Chrome browser
- mobile simulator extension for Chrome is helpful for viewing

## Installation

1. Create a database named `sip_central`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate some introductory data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. The home page will be a list of all wines previously rated
2. Click any of the wines to bring up a detailed view of the ratings from that tasting.
3. Use the heart and trash can icons in order to favorite and delete these tastings.
4. Favorited tastings can be seen in the favorites tab at the bottom
5. Clicking "New Tasting" will bring user to a form to begin filling out the basic wine inforamtion.
6. The following four pages are dedicated to the wine tasting process. 
  - They are: appearance, nose, palate, and overall score.
  There are basic wine tasting tips available on each page if the user is unsure what to look for in the wine. 
  The user will rate the wine on a 0-100 scale, and can take any extra notes on the tasting if they wish.
7. A QR code for the specific wine is created at the beginning of each tasting to have fiends scan it so that they can also rate this wine.
8. At the end of the tasting users will be taken to a ratings page where all the scores for that wine will be averaged and shown to anyone on the same page.


## Built With

- React
- Redux
- Redux-Sagas
- Node
- Axios
- Express
- Material UI
- PostgreSQL
- Postico
- Passport
- CSS
- HTML 5
- Javascript

## Deployment
1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
6. Add an environment variable for SERVER_SESSION_SECRET with a nice random string for security
7. In the deploy section, select manual deploy

## Authors
Jean-Luc LaCosse - all work - jeanlacosse@gmail.com

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [jeanlacosse@gmail.com](www.google.com)
