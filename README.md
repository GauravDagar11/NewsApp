# NewsApp

Client directory contains my-app directory which has frontend React files.
server directory contains backend node files and database.

Server is running on port 5000. To start the server we have to change directory to server and then command nodemon app.js.There should be no program running
on port 5000

React is running on port 3000. To start the react we have to change directory client/my-app and then gave command npm start.There should be no program running 
on port 3000

Can be run easily on softwares like VS Code.

Login Credentials :- 
username : Gaurav
passowrd: Gaurav@123

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
client/my-app 

path "/" is the welcome page where user needs to register or login himself to proceed further.
path "/register" to register.
path "/login" to login.
path "/news/:id" where page have different news categories.
path "/saved-news" where user can see their saved news.


-----------------------------------------------------------------------------------------------------------------------------------------------------------------
server

path "/registration" API to check details from the client and regsiter. 
path "/login" API to chck details from the client and login.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------

In this project any one can register himself by providing details on the register page. If username,email,number already taken then error will be shown. Password should be combination of Capital letter, Lower case letter,digit, special characters.
After login users can see all the news and can also save them.

Technologies Used :- React Js, Node Js, Express, Sqlite, Modern Authorisation Token, Cookies, Local storage, Hooks.
