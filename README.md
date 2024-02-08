# QuizApp - A React-DotNet-SQL Server Web Application
## Overview
An educational application designed to test one's knowledge through interactive quizzes.

## Table of contents

- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Database](#database)
- [Retrieving Data](#retrieving-data)
- [Functionality](#functionality)
 
## Technologies Used

The frontend is built with React, while the backend is implemented with the help of  ASP.NET Core with Entity Framework Core and the data isstored in a SQL Server database.

### Frontend
This client side is created with React, while various features were used to enhance the overall experience.
#### Dependencies

* **React Redux:** The official React bindings for Redux, a state management library for JavaScript applications. It integrates Redux with React components, allowing them to subscribe to the Redux store and dispatch actions.
* **Redux Toolkit:** Redux Toolkit is the official Redux package for efficient Redux development. It simplifies common Redux tasks, such as creating actions and reducers, by providing utilities and conventions for writing Redux logic.
* **React Router Dom:** React Router DOM is a routing library for React applications. It enables developers to define and manage application routes, allowing for navigation between different views and components in a single-page application context. 
* **MaterialUI:** A React library thatprovides visually appealing components and theming, contributing to an enhanced user interface.
* **React Hook Form:** A React library meant to efortlessly handle form submissions.
* **Cloudinary:** Integrated as a cloud-based media management and delivery service, enabling users to upload one or multiple pictures.
* **Axios:** A Javascript library for the management of HTTP requests to the server.
* **React Query:** The app utilizes this library to manage and fetch data seamlessly, providing a responsive and dynamic user experience.

### Backend
The server side of the app is developed using  ASP.NET Core with Entity Framework Core, alongside a varety of packeges that are meant to enhance the functionality, security, data access of this app.

#### Packeges

* **Microsoft.EntityFrameworkCore:** Entity Framework Core is a modern object-relational mapping (ORM) framework for .NET. It supports LINQ queries, change tracking, updates, and schema migrations.
* **Microsoft.EntityFrameworkCore.SqlServer:**  An extension package for Entity Framework Core that adds support for SQL Server database providers. It includes additional features and optimizations for interacting with SQL Server databases.
* **Microsoft.AspNetCore.OpenApi:**  A package for integrating Swagger/OpenAPI documentation generation with ASP.NET Core applications. It allows developers to automatically generate API documentation based on controllers and endpoints defined in the application.
* **Azure.Core:** A package that provides core functionality for interacting with Azure services in .NET applications. It includes common Azure service client libraries, authentication mechanisms, and error handling utilities.
* **Azure.Identity:** A package for Azure Active Directory (AAD) authentication in .NET applications. It provides classes and utilities for authenticating users and service principals with AAD using various authentication methods.
* **Microsoft.AspNetCore.Cors:** A package for enabling Cross-Origin Resource Sharing (CORS) in ASP.NET Core applications. It allows servers to specify which origins are allowed to access resources, enhancing security and interoperability in web applications.
* **Microsoft.AspNetCore.Authentication.JwtBearer:** A package for JWT (JSON Web Token) authentication in ASP.NET Core applications. It enables authentication using JWT tokens issued by trusted authorities, such as identity providers.
* **BCrypt.Net-Next:** A .NET implementation of the bcrypt password hashing algorithm. It provides methods for securely hashing passwords and verifying password hashes, offering protection against brute-force and rainbow table attacks.
* **Auto.MApper:** A library for .NET that simplifies the process of mapping data between different types. It provides a convenient way to configure object-to-object mapping, reducing the need for manual mapping code.

## Database

I have decided to work with a relational database and SQL Server, with it's robust database platform ended up being a perfect choice.

### Retrieving Data

In order to establish a connection between the client and the server, I have chosen RTK Query, a powerful data-fetching and caching library provided by Redux Toolkit.

## Functionality

The application comes with a variety of features: authentication and creating cards, keeping the cards pulic, or allowing them to be public, editing and deleting them. And, with the help of Redux, the user can ask for quizes and, at the end, they will get back their score. 
