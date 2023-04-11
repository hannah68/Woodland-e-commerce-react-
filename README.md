# WoodLand
> WoodLand is a fully responsive e-commerce furniture website.

<img src='./frontend/public/assets/images/woodland.gif' width="600px"/>

## Description
After learning React during Boolean's bootcamp, we had to complete a solo project using the framework. I had always been curious about how e-commerce websites were built, so I challenged myself to create one in less than a week. I decided to focus on creating an online furniture store due to my passion for interior design. Initially, I used JSON Server for the project, but now I have decided to extend the website by adding a backend using MongoDB.

## Main Features & Functions

1. #### Best-Selling Furniture: (Discover and Shop the Latest Trends) ####
A user visits the home page and sees a list of the best-selling furniture items. They click on one of the items to view more details about it.

2. #### Sign Up and Save: (Create an Account for Easy Purchasing) ####
The user decides to create an account in order to add items to their basket and make future purchases more easily. They navigate to the login page and enter their email and password to sign up.

3. #### Filter and Find: (Browse Products by Type, Color, Collection, and Price) ####
The user wants to browse the available products, so they navigate to the shop page and use the filtering options to narrow down the selection by type, color, collection, and price range.

4. #### Search and Sort: (Find the Perfect Product at the Right Price) ####
The user has a specific item in mind that they want to purchase, so they use the search bar to find it. They then sort the search results by price to find the best deal.

5. #### Explore and Learn: (View Product Details and Customer Reviews) ####
The user finds an item they like and clicks on it to see more details, including multiple photos, a description, and customer reviews.

6. #### Add to Cart and Checkout: (Purchase Items with Ease) ####
The user decides to add the item to their basket and proceeds to checkout. They are prompted to enter their shipping and payment information. (It's under construction :slightly_smiling_face:)

7. #### Edit Your Cart: (Remove or Update Items Before Checkout) ####
The user realizes they accidentally added the wrong item to their basket, so they navigate back to the basket and remove the unwanted item from their basket.

8. #### Share Your Thoughts: (Write Reviews and Help Others Make Informed Choices) ####
After receiving the item, the user writes a review to share their thoughts and feedback with other customers.

## Methods Used
- navigate UI with **react-router**
- Implement global state with **useContext** and **useReducer** hooks in **React**.
- Transfer states between routes with **useNavigate**
- Work with **useLocation** to get the necessary information about the current route
- Remove the side effect of fetching data from API endpoints by using **useEffect**
- Create MongoDB backend
- Use Cloudinary for storing images and optimzed 


## Tech Stack
- React
- Figma
- MongoDB
- Express.js
- Cloudinary
- Mongoose


## Installation
- First, run `npm ci` to install the dependencies (need node.js for npm)
- Finally, run `npm run start` to run the app via <a href="http://localhost:3000">localhost<a/>

## In Progress
1. Users should be able to register on the website to keep track of the items added to their basket and write reviews. Currently, I am working on a branch to create a backend for my project using **MongoDB and Express**.
2. I will probably use a CDN such as Cloudinary to enhance the speed of image loading instead of storing them in assests.
