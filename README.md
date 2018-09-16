![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Ironhack Coding Challenge

Welcome to Ironhack code challenge!

The project includes the scaffold to start the coding challenge. First of all, you'll need to install and configure it, and after that, you will be ready to complete the challenge: create a ToDo list.

This challenge is composed of five parts and is made to test full stack skills. You will need to use **GraphQL**, **NodeJS**, and **ReactJS**. Feel free to add any CSS preprocessor. You will also use **MongoDB** as a database, and **Jest** is already configured to help you test the app.

Go ahead and let us know if you have any question or feedback; it's more than welcome.

Once you have done your code challenge, send us your Github repository link with the solution to [product@ironhack.com](mailto:product@ironhack.com).

## Configuration

In this project, you will see two different configurations: client and server. Here, you will find the steps to configure both of them.

**Fork** this repo into your account and **Clone** it into your desired folder.

You need to install all the dependencies. As we are giving you client and server, you need to configure both projects separately.

You should go to `/server` folder and install all the dependencies using *npm* or *yarn*. After this configuration, you need to seed the database and run the server:

```
$ cd server
$ yarn
$ yarn run init:seed
$ yarn start
```

In the same way, and without closing the server, you need to go to `/client` folder and proceed with the installation and configuration:

```
$ cd ../client
$ yarn
$ yarn start
```

And that's all! You have everything up and running. You can visit `http://localhost:3000` to start working on the coding challenge!

## Exercises

This code challenge has five parts. You don´t have to do all of them. The more you do, the better knowledge we will have. We don't like boring iterations, so we have named each part of the challenge differently. We hope you like GoT ;)

### 1 - House Baratheon

You will find a fake ToDo list with five items inside `client/fake-data` folder. We need to see how would you represent this data in `http://localhost:3000`.

Organize the components, containers, styles, etc. as you wish. You have to use `ReactJS` and `CSS` (remember that you can add a CSS preprocessor if you need it). The look and feel will not be the most critical part of the challenge, but we appreciate a nice looking one.

We are going to focus on the code (`JavaScript` and `CSS`), the way you represent the architecture, good practices, and testing.

This project, bootstrapped with Create React App, has been configured with babel, so you should use ES6/ES7. If you need more information about settings, you can check out [Create React App documentation](https://github.com/facebookincubator/create-react-app).

### 2 - House Lannister

We are going to work with the [GraphQL API](https://graphql.org/) you'll find in the `server` folder. In the `schema.js` file, you'll find a very basic schema defined. You have to complete the `Query` by **creating the code for the `resolve()` method** of the `list` field. Use the models you'll find in the `model` folder to fetch the information from the database.

The `list` method should return the list information with all its items. You have to create and organize the necessary code to do that.

Remember that you can check out if your code is working in `http://localhost:4000/graphql` through the graphiql interface.

Once the GraphQL API is ready to fetch the list with its items, update the `client` part to fetch the information from the database. Feel free to add any tool you need to do it. You can also use Redux, MobX, or whatever you want to manage your app state.

---

To sum up, to complete this step, you have to do the following:

**Server**

- Update the GraphQL `Schema` by completing the `ListType`.
- Update the GraphQL `Schema` by implementing the `resolve()` method.
- Check out the behavior in `http://localhost:4000/graphql`. *Optional*

**Client**

- Fetch the database information through the GraphQL API.
- Show the fetched information with the components created in the `House Baratheon` iteration.
- Add a global state manager like Redux, MobX, or any other. *Optional*

### 3 - House Stark

We need to update, create, and delete our data. You will need to do Back-End functionality and Front-End views to achieve this goal. We have to be able to:

- Add a new item to the list.
- Update an existing item in the list.
- Remove an existing item in the list.
- Toggle the status of an item: done / not-done.

### 4 - House Tully (*Extra*)

We also want to be able to have several lists in our app. Again, you will need to do Back-End functionality and Front-End views to achieve this goal. We have to be able to:

- Add a new list.
- Update an existing list title.
- Remove an existing list.

Of course, each list will have its own items.

### 5 - House Targaryen (*Extra*)

Now, we've decided that some items in the lists are more important than others. Here, you have to add the necessary code to be able to sort the list items. Use the best technique to achieve that: input with the order, buttons to move the items up or down, drag & drop...

### 6 - House Tyrell (*Extra*)

To finish up, we want to be able to create private lists. There are several ways of implementing this features. However, we want to know which would be yours from scratch.

There are two different ways to complete this step:

- Implement the code to show us how you would create private lists.
- Create a `PrivateLists.md` file in the root of the project, and explain us the strategy you would follow. In this second case, you have to create the markdown as a very detailed spec indicating all the steps you should follow to achieve the goal.

Both strategies are more than welcome, so it's up to you decide which one you will do :)

## Pieces of advice

We will love to receive your code, even if you are not interested in joining Ironhack Product team. We will like your app if:

- You follow clean coding practices.
- You test all the app ([Jest](https://facebook.github.io/jest/) is configured).
- You use git properly.
- You care about UX a little bit.

Good luck, and happy coding! :)
