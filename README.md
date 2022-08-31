
# E-Commerce React Project

I created this project during my summer break between my 2nd and 3rd year at university. It is created in ReactJS, as I wanted practice with it and it's very powerful.




## Packages Used

 - [Material UI/Icons](https://mui.com/) - Used the search and cart icons on the header
 - [Stripe](https://stripe.com/gb) - Handles the payment process
 - [Axios](https://axios-http.com/docs/intro) - Making requests to the backend
 - [Firebase](https://firebase.google.com/) - Database system. Handles authentication, storing of various data, and as a backend to handle sensitive data on server-side
 - [Moment](https://momentjs.com/) - Get a Unix Epoch time to store, and to convert into a readable format
 - [React Currency Format](https://github.com/mohitgupta8888/react-currency-format) - Used for formatting currency easily
 - [React Router DOM](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom) - Used for routing between pages effectively

## Run Locally

Clone the project

```bash
  git clone https://github.com/HarryMate/ecomm-react.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Create a Firebase Account at https://firebase.google.com/

Create a new project

Go to project settings then scroll down to find the firebase config (ensure it is set to NPM)

Navigate to the 'src' folder in the project and rename Firebase.js.example to Firebase.js

Paste the Firebase Config where the comment says to

Start the server

```bash
  npm run start
```

Start Firebase Backend

```bash
  firebase emulators:start
```

## Acknowledgements

 - [Media Queries](https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/) - Media Queries don't work in React, this code allows them to work
 - [Hamburger Menu](https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/) - Code for a Hamburger menu for mobile devices