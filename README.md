# Impressio - Story Sharing App

[Impressio App](https://impressioapp.herokuapp.com)

## Features

- Authentication
- Comments
- Google OAuth
- Follow/Unfollow
- Like/Unlike
- Pagination
- Search
- Share

## Stack

- [MongoDB](https://www.mongodb.com) - NoSQL database
- [Express](https://expressjs.com) - Back end web application framework for Node.js
- [React.js](https://reactjs.org) - A JavaScript library for building user interfaces.
- [Node](https://nodejs.org/en/) - JavaScript runtime environment that executes JavaScript code outside a web browser.

## Project structure

```
$PROJECT_ROOT
+-- backend
|   +-- config                          // MongoDB Configuration
|   +-- controllers                     // Express Controllers
|   +-- middleware                      // Auth Middleware
|   +-- models                          // Mongoose Models
|   +-- routes                          // Express Routes
|   +-- utils                           // Token Generator
|   +-- server.js                   	// Server Entry Point
+-- frontend
|   +-- public                          // Static Files
|   +-- src                             // App Root Folder
|   |   +-- actions                     // Redux Actions
|   |   +-- components                  // React Components
|   |   +-- constants                   // Redux Constants
|   |   +-- images                    	// Static Images
|   |   +-- reducers                    // Redux Reducers
|   |   +-- screens                     // Page Files
|   |   +-- App.js                      // App Compnent
|   |   +-- index.js                    // App Entry Point
|   |   +-- store.js                    // Redux Store File
+-- uploads                             // Uploaded Files
```

## Packages/Modules utilized

- **Backend**

		- bcryptjs					: enables storing of passwords as hashed passwords
		- body-parser					: Node.js body parsing middleware
		- colors       				: get colors in your node.js console
		- cors						: enable CORS with various options
		- dotenv                			: loads environment variables from .env file
		- jsonwebtoken					: for securely transferring data within parties using a JSON object

- **Frontend**
    
		- axios                                    	: promise based HTTP client for the browser and Node.js
		- @material-ui/core 				: Material UI React components 
		- @react-oauth/google				: Google OAuth2 using Google Identity Services for React
		- moment 					: date library for parsing, validating, manipulating, and formatting dates
		- react-file-base64				: converts files to base64 format
		- redux 					: manages and centralizes application state
		- react-redux 					: React UI bindings layer for Redux 


## Steps to Install & Run

1.  Clone the code from this repo
2.  Open terminal on frontend and backend folders and type `npm install #or yarn install`
3.  Run the development server `npm start #or yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Homepage

![Home](https://i.ibb.co/587b1fR/App-Homepage.png)
