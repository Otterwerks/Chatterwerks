
# Chatterwerks

_A chat that works_

Heroku Links:

Heroku live/production <a href="https://otterwerks-chat-app.herokuapp.com">HERE</a>

Heroku development/staging <a href="https://otterwerks-chat-staging.herokuapp.com">HERE</a>


<br>

<p><img src="icons/react.svg" width="50">&nbsp&nbsp&nbsp&nbsp<img src="icons/react-router.svg" width="80">&nbsp&nbsp&nbsp&nbsp<img src="icons/flask.svg" width="40">&nbsp&nbsp&nbsp&nbsp<img src="icons/postgresql.svg" width="50">&nbsp&nbsp<img src="icons/gunicorn.svg" width="80">&nbsp&nbsp&nbsp&nbsp<img src="icons/heroku.svg" width="30">&nbsp&nbsp&nbsp&nbsp<img src="icons/postman.svg" width="40">&nbsp&nbsp&nbsp&nbsp<img src="icons/python.svg" width="40">&nbsp&nbsp&nbsp&nbsp<img src="icons/javascript.svg" width="40">&nbsp&nbsp&nbsp&nbsp<img src="icons/html-5.svg" width="35">&nbsp&nbsp&nbsp&nbsp<img src="icons/css-3.svg" width="35"></p>

<br>

<img src="chatterwerks_sample.png" width="600">

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary
Chatterwerks is a simple chat application that focuses on utilizing a PostgreSQL relational database to keep track of users, channels, channel subscriptions, and messages. 

## Hey Otter!
Otter is the chat bot in the home channel that I adapted from a command line <a href="https://github.com/Otterwerks/Virtual-Otter">virtual assistant</a> script I had made some time ago. Otter can assist with arithmetic as well as the date and time.

- Talk to Otter by starting off your message with ```Hey Otter, ```

## Security
In designing this project I wanted to make sure that users would not be able to manipulate data stored in the browser to gain unauthorized access to channels or submit fraudulent messages. The login process for Chatterwerks simply verifies that an associated User ID exists in the User table for the submitted credentials and stores those credentials in the browser for future requests if they are valid. 

#### Loading channel messages
User credentials are submitting with this request in order to allow the backend to resolve a User ID. The User ID is then validated in the Subscription table to see if that User ID is allowed to view messages in the channel and messages are returned in the response if the user is subscribed.

#### Sending a message
Sending a message also involves submitting user credentials to not only authorize the user but also validate that the user is subscribed to the channel they are attempting to submit a message to.

## Technical
Clients use interval polling to receive new messages from the database. I understand this method carries additional network overhead and I chose to implement this method beause it allowed me to continue making progress in developing other aspects of the project.

## Resources Used:
- <a href="https://redux.js.org/basics/example">Redux JS To-Do Example</a>
- <a href="https://redux.js.org/advanced/usage-with-react-router">Redux JS with React Router</a>
- <a href="http://flask-sqlalchemy.pocoo.org/2.3/">Flask-SQLAlchemy Documentation</a>
- <a href="http://www.postgresqltutorial.com/">PostgreSQL Tutorials</a>
- <a href="https://www.udemy.com/react-2nd-edition/">The Complete React Web Developer Course (with Redux)</a>
- <a href="https://getbootstrap.com/docs/4.0/getting-started/introduction/">Bootstrap Quickstart Documentation</a>
- My previous project <a href="https://github.com/Otterwerks/Tweet-Finder">Tweet-Finder</a>
- <a href=""></a>
