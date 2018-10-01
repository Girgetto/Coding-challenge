const Lists = require('../../server/models/list');
const ListItem = require('../../server/models/listItem');

const getData = () => ListItem.find({}).populate('list', Lists);

const addItem = (args) => {
  const list = new Lists({
    title: 'New List',
  });
  list.save();

  const item = new ListItem({
    list: list._id, //eslint-disable-line
    text: args.text,
  });
  return item.save();
};

const updateItem = (parent, args) => ListItem.findOneAndUpdate({ _id: args.id }, args);

const removeItem = (parent, id) => {
  ListItem.findByIdAndRemove(id)
    .then(removedistItem => removedistItem)
      .catch(err => console.log(err));//eslint-disable-line
};

const addList = (parent, id) => {
  const list = new Lists({
    title: 'New List',
  });
  list.save();

    const result = ListItem.findByIdAndUpdate(id, { $push: { list: list._id } }, { new: true }); //eslint-disable-line
  return result;
};

const editList = (parent, args) => Lists.findOneAndUpdate({ _id: args.id }, args);

const deleteList = (parent, id) => Lists.findByIdAndRemove(id);//eslint-disable-line

module.exports = {
  getData,
  addItem,
  updateItem,
  removeItem,
  addList,
  editList,
  deleteList,
};
