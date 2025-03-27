<a name="readme-top"></a>

<h1 align="center">University Management System</h1>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#tools">Tools</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

The University Management System (UMS) is a web-based application that provides a comprehensive solution for managing students, courses, scheduling exams, and finding common free time slots among students. It is designed to streamline university administration and enhance the student experience. 

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>

### Features

* **Add Student and Add Course:** University administrators can easily add and manage student and course records. The system ensures data accuracy and integrity by enforcing data constraints.
*	**Find Common Timing:** This feature allows administrators to select students and find common free time slots in their schedules. The system analyzes course schedules and highlights common free time slots, making it easier for administrators to plan events, group meetings, or activities.
*	**Schedule Exam Timing:** Administrators can schedule exams for courses that have classes on Fridays or Saturdays. The system checks for room availability and avoids scheduling conflicts by ensuring that no two exams occur in the same room at the same time.

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>


### Tools

* [Nodejs](https://nodejs.org/en/)
* [Expressjs](https://expressjs.com/)
* [Express-validators](https://express-validator.github.io/docs/)
* [Body parser](https://www.npmjs.com/package/body-parser)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [cors](https://www.npmjs.com/package/cors)
* [Figma](https://www.figma.com/)

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>


<!-- GETTING STARTED -->
## Getting Started

Follow the below steps carefully to set up the UMS locally on your device.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AmzBG/UMS.git
   ```
2. Open project in vscode

   Double click <b>Open_project.bat</b>
   
3. Create a `.env` file in the root directory and add the following fields:
   ```plaintext
   # App
   PORT = <your_port>

   # Database credentials
   DB_HOST = <your_database_host>
   DB_USER = <your_database_user>
   DB_PASS = <your_database_password>
   DB_NAME = <your_database_name>
   DB_PORT = <your_database_port>

   # Admin info
   ADMIN_USERNAME = <your_admin_username>
   ADMIN_PASSWORD = <your_admin_password>

   # Jwt key
   JWT_SECRET_KEY = <your_jwt_secret_key>
   ```

4. Install NPM packages
   ```sh
   npm install
   ```
5. Run the server
   ```sh
   npm run dev;
   ```
   
<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>


## API Endpoints
<!-- Course endpoint-->
<h3>Course</h3>

```js
/api/course
```
<details>
<summary>Course details</summary>

* Retrieves all courses available
```js
/api/course/getAll
```
* Retrieve an available course
```js
/api/course/get/{id}
```
* Create a course
```js
/api/course/create
```
* Update a course
```js
/api/course/update/{id}
```
* Delete a course
```js
/api/course/delete/{id}
```
</details>


<!-- Student endpoint-->
<h3>Student</h3>

```js
/api/student
```
<details>
<summary>Student details</summary>

* Retrieves all students available
```js
/api/student/getAll
```
* Retrieve an available student
```js
/api/student/get/{id}
```
* Create a student
```js
/api/student/create
```
* Update a student
```js
/api/student/update/{id}
```
* Delete a student
```js
/api/student/delete/{id}
```
</details>


<!-- Exam endpoint-->
<h3>Exam</h3>

```js
/api/exam
```
<details>
<summary>Exam details</summary>

* Retrieves all exams available
```js
/api/exam/getAll
```
* Retrieve an available exam
```js
/api/exam/get/{id}
```
* Create an exam
```js
/api/exam/create
```
* Update an exam
```js
/api/exam/update/{id}
```
* Delete an exam
```js
/api/exam/delete/{id}
```
</details>


<!-- Enrollment endpoint-->
<h3>Enrollment</h3>

```js
/api/enrollment
```
<details>
<summary>Enrollment details</summary>

* Retrieves all enrollments available
```js
/api/enrollment/getAll
```
* Retrieve an available enrollment
```js
/api/enrollment/get/{id}
```
* Create an enrollment
```js
/api/enrollment/create
```
* Update an enrollment
```js
/api/enrollment/update/{id}
```
* Delete an enrollment
```js
/api/enrollment/delete/{id}
```
</details>

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>


## Database Schema

<h3>Get the database schema</h3>

![image][erd-image]


<h3>Table Descriptions</h3>

* Student: This table stores student information <details>
  <summary>fields</summary>
  
  * ID (Primary Key)
  * Name
  * Email
  * Major
  * Gpa
  * Date Joined
  * Password
  </details>

* Course: This table maintains information about university courses <details>
  <summary>fields</summary>
  
  * ID (Primary Key)
  * Code
  * Name
  * Credits (1, 3, 6)
  * Type (Major Course, Normal Course, Lab)
  * Day (e.g., M/W, T/TH, M, T, W, TH)
  * Timing (e.g., 8:00-9:30, 9:30-11:00, etc.)
  * Capacity
  * Enrolled
</details>

* Enrollment: This table manages student enrollments in courses <details>
  <summary>feilds</summary>
  
  * ID (Primary Key)
  * Course ID (Foreign Key)
  * Student ID (Foreign Key)
</details>

* Exam: This table is responsible for scheduling exams <details>
  <summary>fields</summary>

  * ID (Primary Key)
  * Day (F or Sat)
  * Timing (e.g., 8:00-9:30, 9:30-11:00, etc.)
  * Room
  * Course ID (Foreign Key)
</details>

<h3>Relationships</h3>

*	Courses can be taken by multiple students.
*	Students can enroll in multiple courses.
*	Exams are associated with specific courses.

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>


<!-- CONTACT -->
## Contact

Amir Bou Ghanem - amir.boughanem@std.balamand.edu.lb

Project Link: [https://github.com/AmzBG/CSIS228_Project](https://github.com/AmzBG/CSIS228_Project)

<p align="right"><a href="#readme-top"> <img src="https://cdn.pixabay.com/photo/2012/04/28/19/08/arrow-44083_1280.png" width="40" height="40" /></a></p>


[erd-image]: images/ERD.png
