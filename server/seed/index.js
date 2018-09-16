const mongoose = require('mongoose');
const ListModel = require('../models/list');
const ListItemModel = require('../models/listItem');

mongoose.connect('mongodb://localhost:27017/ih-coding-challenge');
const listItems = [
  'Clone the repository',
  'Watch a Silicon Valley episode',
  'Implement the front-end',
  'Watch a Game of Thrones Episode',
  'Implement the GraphQL API and Integrate it with the front-end',
];

const createList = () => new Promise((resolve, reject) => {
  ListModel.create({ title: 'ToDo List' }, (error, list) => (error ? reject(error) : resolve(list)));
});

const createListItems = (list) => {
  const listItemPromises = [];

  listItems.forEach((listItem) => {
    listItemPromises.push(new Promise((resolve, reject) => {
      ListItemModel.create({ list, text: listItem }, (error, createdItem) => {
        return error ? reject(error) : resolve(createdItem);
      });
    }));
  });

  Promise.all(listItemPromises).then(() => mongoose.connection.close());
};

createList().then(createListItems);
