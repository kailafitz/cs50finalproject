# LANCER

##### Video Demo:

### Description

This is a mobile-friendly flask/react application that is aimed towards freelancer's to keep track of job records and invoices, and tax due on an annual basis. The tax calculation is loosely based off the current Irish tax system in place. The application comes with a clean interface achieved with Bootstrap, and features include the recording of jobs, the updating and deletion of jobs and a mini dashboard. Registration/ Login is required.

### Backend Notes

I chose to write a flask application with a JWT login system and a sqlite3 database. Application entry is in the 'app.py' file where we have some configuration of the authorisation system and other configuration settings. A run through of the files are as follows:

- 'models.py' contains the models upon which the data is structured. The database models have relationships between each other so that only one UserAddress and one BankAccount is linked to any given user in the system (one-to-one relationships). In saying this, a User can have multiple Jobs (one-to-many). Furthermore, a Job can only have one Employer (many-to-one) and a User can have many Employers in the system (one-to-many). Primary and foreign keys are used to link the relevant models, the user's email address often being the foreign key for the associated BankAccount, UserAddress and Employer, for example.

- A variety of HTTP requests are featured in the 'routes.py' file in order to GET, POST, PUT and DELETE data between the frontend and the database. One of the first routes defined is the '/active' route which checks to see if the JWT is active.

- 'schema.py' is a file that is useful for serialising the model objects for sending to the frontend.

#### Some key patterns seen across the routes:

- Current user is checked through acquisition of an active JWT, if it exists
- POST methods receive JSON from frontend
- A variable is assigned to each data value from a key value pair in the JSON
- The data variables are checked server-side for any empty values
- Marshmallow schemas are used to return serialised data models

The following notes on each route provide some insight and points of interest:

###### Notes on register() route function

- Data regarding user sign up details, bank account and user address are taken in and saved to the relevant tables in database
- A check is in place for password matching before registering and submission
- The passwords are saved as hash values in the backend for security purposes
- A token is created for the user session

###### Notes on login() route function

- Check if posted password is matching hashed password in database
- A token is created for the user session

###### Notes on dashboard() route function

- Gross, tax and net values are summed up based on the year value submitted from the frontend
- Current year data is returned from GET, along with an array of all unique year values found in job records from the 'date_created' column

###### Notes on records() route function

- Return all jobs associated with the logged-in user

###### Notes on addJob() route function

- Once current active user is distinguished from JWT, the username is used to query for the User in database
- Tax calculations are carried out on some of the data variables
- Upon the GET request, a list of Employer objects is returned

###### Notes on updateBankAccount()/ updatePersonalDetails() route functions

- User's email used to get associated BankAccount and UserAddress data
- Upon the GET request, default values are loaded into the form

###### Notes on edit_record(id) route function

- An id is taken as argument and used to query the Job in question
- Data is received from frontend as json and saved to database using the queried Job id
- A new employer is saved to database if the relevant data is included in the posted json
- List of employers are returned to frontend for selection

###### Notes on delete_job(id) route function

- Record is deleted from database using the id passed from url

###### Notes on invoice(id) route function

- An id is used to query the Job in question and associated BankAccount, UserAddress and Employer
- Return the serialised models a in dictionary

###### Notes on logout() route function

- Unset the JWT

### Frontend Notes

React is my chosen frontend javascript framework. The home page is minimalistic but features a wonderful Lottie animation that encapsulates all this application is and can be going forward.

The navigation bar links change depending on whether or not a correct JWT is active. A custom hook is used to get and set the JWT. Axios is used to make calls to the endpoints.

Form data is captured through event.targets upon submission and the corresponding input number. Client-side validation is carried out with React-Hook-Form and Yup schemas which is very customisable.

When setting data across the application in useEffects, hooks are used to create checks in order to render data when ready.

The following notes on each page/component provide some insight and points of interest:

###### Notes on Register.js and Login.js

- Stepper used for ux, breaks up the form comprehensively
- Data from inputs is captured from the Submit event
- Client-side validation is triggered on the input's onBlur event
- If criteria is met, the data is posted as json key value pairs
  If successful, we take the access token from the response and use our custom hook to set it
- Redirect to Records page
- If an error is received from the backend, an error message will be ready to capture that message for user feedback purposes

###### Notes on Records.js

- Records are displayed with a GET method in a Bootstrap table
- We get the JWT with our custom hook from the header of the call
- UpdateJob.js is a component that can be called to update a Job record
- DeleteJob.js is a component that can be called to delete a Job record
- If no data exists, a Lottie animation is displayed with a link to add Job data

###### Notes on Invoice.js

- Data is pulled from all models into this component and displayed in such a way that can be exported a ready-to-send invoice in .pdf format.
- Invoice column does not appear on screen sizes below the xl breakpoint as the layout is distorted and doesn't fit on one A4 page when exported

###### Notes on AddJob.js

- List of Employer objects associated with user are received
- There is a chance to select an employer from this list or add a new employer with the use of a switch input. If the switch is off, a user selects a previous employer for the job. Else, a new employer can be inputed and submitted. When the Select input is used, the employer name is used to fill the other Employer fields by performing a loop

###### Notes on UpdateJob.js

- Job id gets passed from Records.js
- Modals are used given how little data is needed for the update
- Default values are set for form inputs from the response data
- Employer can be updated for the Job and is done in the same fashion as in AddJob.js
- Cancel button resets the default values and clears any errors
- Yup schemas for client-side is in place
- Submit button triggers the submit event. If successful, data is set to a hook variable and error messages are cleared

###### Notes on DeleteJob.js

- Job id gets passed from Records.js and sent to backend through url

###### Notes on Dashboard.js

- Very minimal dashboard which displays annual data
- A dropdown select menu to filter for data from different years, if the data exists
- If no data exists, a Lottie animation is displayed with a link to add Job data

###### Notes on Settings.js

- UpdateBankAccountDetails.js and UpdatePersonalDetails.js feature on this page which are components that send PUT http requests to backend in order to update bank account and personal details
- Very similar setup to the UpdateJob.js

### A Note on Style & Design

From a design point of view, the Bootstrap grid system, or flexbox, is used to precisely position everything across the pages. Colours are subtle and soft so as not to distract from the data and numbers. The look and feel is minimalistic, white space is favoured. That being said, Lottie animations bring something pleasing to the page where they appear and serve a purpose.

### Instructions to Start

##### Activate virtual environment

% source env/bin/activate

##### Install requirements.txt and package.json respectively

% pip install -r requirements.txt
% npm install

##### Activate backend

% python3 app.py

##### Activate frontend

% npm start
