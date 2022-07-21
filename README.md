# Project Title: LANCER

#### Video Demo:

##### Description: This is a flask with react application that is a tool for Irish freelancer's to keep track of job records and invoices, and tax due on an annual basis. The tax calculation is loosely based off the current Irish tax system in place. The application comes with a clean interface through Bootstrap, and features include the tracking of jobs, the updating and deletion of jobs and a mini dashboard. Registration/ Login is required.

##### Python: In the backend, I chose to write a flask application with a JWT login system and a sqlite3 database. Application entry is in the 'app.py' file where we have some configuration of the login system and other configuration settings. The database models have relationships between each other so that only one UserAddress and one BankAccount is linked to any given user in the system (one-to-one relationships). In saying this, a User can have multiple Jobs (one-to-many). Furthermore, a Job can only have one Employer and a User can have many Employers in the system. Multiple routes are defined for the communication of data from the frontend to the backend. Certain routes are decorated for authorisation and cross-origins purposes.

#### React: Our Home page is simple and has a Lottie animation which is fitting for the system tools in place. 



<!-- Activate virtual environment
-> source env/bin/activate

Install requirements.txt and package.json respectively
-> pip istall -r requirements.txt
-> npm install

Activate backend
-> python3 app.py

Activate frontend
-> npm start -->
