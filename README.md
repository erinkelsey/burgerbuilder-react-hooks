# Burger Builder

React app to build burgers with a fixed set of ingredients. This app uses axios for HTTP Requests, react-router for routing, hooks for state management, and Firebase as the backend.

Check https://github.com/erinkelsey/burgerbuilder-react for example of running app.

## Setup

### Node Modules

    $ npm install

### Firebase

#### Database

1.  Setup a new project on firebase
2.  Go to the Realtime Database page
3.  Click on 'Create Database' button. This will create a MongoDB-like database.
4.  Take note of the database endpoint, it will be something like: https://[your-project-name].firebaseio.com/
5.  Set the rules to:

        {
            "rules": {
                "ingredients": {
                    ".read": true,
                    ".write": true,
                },
                "orders": {
                    ".read": "auth != null",
                    ".write": "auth != null",
                    ".indexOn": ["userId"]
                }
            }
        }

#### Authentication

1. Go the Authentication page
2. Go to the Sign-in method tab
3. Enable the Email/Password provider

Firebase endpoint for sign up with email/password:

    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

Firebase endpoint for sign in with email password:

    https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

Firebase endpoint to get user's data:

    https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]

NOTE: You can get your API Key by going to Settings -> General -> Web API Key

For complete docs, check out: https://firebase.google.com/docs/reference/rest/auth#section-api-usage

### Environment Variables

Create a .env file in the main project folder with the following variables:

    REACT_APP_FIREBASE_DB_ENDPOINT=https://[your-project-name].firebaseio.com/
    REACT_APP_FIREBASE_API_KEY=yourapikey

## Run

    $ npm start

## Test

    $ npm run test

## Build

    $ npm run build

## Deploy to Firebase

### Install Firebase tools globally:

    $ npm install -g firebase-tools

### Sign into account:

    $ firebase login

### Initiate project:

    $ firebase init

Steps:

1. Navigate to the following option:
   - Hosting: Configure and deploy Firebase Hosting sites
2. Select Use an existing project
   - Select the project you set up for this app
3. What do you want to use as your public directory?
   - enter: build
4. Configure as a single-page app?
   - enter: y
5. Overwrite file build/index.html?
   - enter: N

### Deploy project:

    $ firebase deploy

NOTE: you can visit your page with the Hosting URL that is outputted once the deploy was successful
