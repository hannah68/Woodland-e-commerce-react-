# WoodLand
> WoodLand is a fully responsive e-commerce furniture website.

<img src='./public/assets/images/woodland.gif' width="600px"/>

## Description
After learning react during the Boolean's bootcamp, we had to do a solo project with react. I was always curious how e-commerce websites were built. Hence, I challenged myself to create one in less than a week. I decided to create a furniture online store because of my passion for interior design.

## Features
The user has the ability to:
- See the best seller furniture on the home page
- Filter products based on their type, color, collection and price
- Search products and sort them based on the highest or the lowest price
- Check the details of products
- Add items to basket
- Edit the basket(removing or adding more items)
- Write reviews 

## Lessons Learned
During this project, I learned how to:
- navigate UI with react-router
- Implement global state with useReducer and useContext
- Transfer states between routes with useNavigate
- Work with useLocation to get the necessary information about the current route
- Remove the side effect of fetching data from API endpoints by using useEffect
- Apply JSON-server to connect database with the frontend via creating RESTAPI (with CRUD operation)

As a result of doing this project, I developed a deep understanding of array methods such as map, filter, reduce, sort, etc.

## Tech Stack and Technologies Used
- Utilized the **useContext** and **useReducer** hooks in **React** to manage global state and facilitate data flow between components
- Designed the UI in **Figma**
- Implemented UI navigation using **React Router**
- Used **JSON-server** to create a **REST API** that connects the database with the front-end
- Created **CRUD operations** for the REST API to enable data management

## Installation
- First, run `npm ci` to install the dependencies (need node.js for npm)
- Finally, run `npm run start` to run the app via <a href="http://localhost:3000">localhost<a/>

## In Progress
1. Users should be able to register on the website to keep track of the items added to their basket and write reviews. Currently, I am working on a branch to create a backend for my project using MongoDB and Express.
2. I will probably use a CDN such as Cloudinary to enhance the speed of image loading instead of storing them in assests.

2. 
