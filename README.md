# Pilot Task(Message App)

## prerequisite

- meteor

## Install dependencies

```
cd <project_name>
meteor npm install
```

## Run the app

```
meteor
```

Finally, navigate to http://localhost:3000. For posting a message the user should be login.If you are not a registered user then sign up with a username and password.

## Run the test case

TEST_WATCH=1 meteor test --port 7000 --driver-package meteortesting:mocha
