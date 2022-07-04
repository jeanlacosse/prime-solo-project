SPIKE
[x] ask a few questions that can be answered on a sliding scale
    [x] slider sets a local state
        [] local state sent to saga
        [] saga send to a post_state 
            [] post_state POST to DB
                [] put a set_state afterwards to reetrieve from DB
    [] have a submit btn that pushes to a thank you page

[] add a qr code to the thank you page that will bring others to the review page
    [] call it "share this rating" or something like that
    [] no user authentication for this part of site
    [] history.push

[] on thank you page load, useEffect
    [] run an axios get to to the router/sagas for the avg ratings to questions
        [] set local state with those averages
    [] display local state averages on DOM
    
[] Heroku
    [] deploy here and add a db so others can log in to website as well