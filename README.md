# LANCER

#### Video Demo:

##### Description: This is a flask with react application that is a tool for Irish freelancer's to keep track of job records and invoices, and tax due on an annual basis. The tax calculation is loosely based off the current Irish tax system in place. The application comes with a clean interface through Bootstrap, and features include the tracking of jobs, the updating and deletion of jobs and a mini dashboard. Registration/ Login is required.

### Backend Notes
##### I chose to write a flask application with a JWT login system and a sqlite3 database. Application entry is in the 'app.py' file where we have some configuration of the authorisation system and other configuration settings.

##### 'models.py' contains the models upon which the data is structured. The database models have relationships between each other so that only one UserAddress and one BankAccount is linked to any given user in the system (one-to-one relationships). In saying this, a User can have multiple Jobs (one-to-many). Furthermore, a Job can only have one Employer and a User can have many Employers in the system. Primary and foreign keys are used accordingly.

##### A variety of HTTP requests are featured in the 'routes.py' file in order to GET, POST, PUT and DELETE data between the frontend and the database. One of the first routes defined is the '/active' route which checks to see if the JWT is active. It is called upon at every route, taking, returning the appropriate response and status based on the JWT it reecives.

##### Each of the POST methods take in the data as json and we assign a variable to each value from a key pair in the json package received. A check ensures that the necessary fields are not committed to the database as blanks, sending back user feedback to the frontend.

###### Notes on register() route function
- Check if username exists in database
- The posted data on user, address and bank account is commited to the relevant tables in the database
- A check is in place for password matching before submission
- The passwords are saved as hash values in the backend for security purposes
- A token is created for the user session

###### Notes on login() route function
- Check if posted password is matching hashed password in database
- A token is created for the user session

###### Notes on dashboard() route function
- Current active user is gotten from active JWT
- Gross, tax and net values are summed up based on the year value submitted from the frontend
- Marshmallow schemas are used to neatly serialise database objects
- Current year data is returned, along with an array of all unique year values found in job records from the 'date_created' column

###### Notes on updateBankAccount() route function
- Current active user is gotten from active JWT
- Find user and associated bank account
- Takes data and updates values in database

###### Notes on updatePersonalDetails() route function
- Current active user is gotten from active JWT
- Find user in database
- Takes data and updates values in database

###### Notes on addJob() route function
- Current active user is gotten from active JWT
- Takes data as json, make some calculations and adds data to database
- List of employers are 

###### Notes on records() route function
- Current active user is gotten from active JWT
- Return all jobs associated with the user with schema

###### Notes on edit_record(id) route function
- An id is taken as argument and used to query the Job in question
- Data is received from frontend as json and saved to database using the queried Job id
- A new employer is saved to database if the relevant data is included in the posted json
- List of employers are returned to frontend for selection

###### Notes on delete_job(id) route function
- Current active user is gotten from active JWT
- An id is taken as argument and used to query the Job in question
- Record is deleted from database

###### Notes on invoice(id) route function
- Current active user is gotten from active JWT
- An id is taken as argument and used to query the Job in question and associated BankAccount, UserAddress and Employer
- Return the database objects in dictionary

###### Notes on logout() route function
- Unset the JWT


### Frontend Notes
##### In the frontend, the 'Home' page is simple and has a Lottie animation which is fitting for the system tools in place. 



<!-- Activate virtual environment
-> source env/bin/activate

Install requirements.txt and package.json respectively
-> pip istall -r requirements.txt
-> npm install

Activate backend
-> python3 app.py

Activate frontend
-> npm start -->
