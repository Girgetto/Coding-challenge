const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean, GraphQLList,
} = require('graphql');
const Lists = require('./models/list');
const ListItem = require('./models/listItem');

const ListType = new GraphQLObjectType({
  name: 'List',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

const ListItemType = new GraphQLObjectType({
  name: 'ListItems',
  fields: {
    _id: { type: GraphQLString },
    list: { type: new GraphQLList(ListType) },
    done: { type: GraphQLBoolean },
    text: { type: GraphQLString },
  },
});

const Query = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    ListItem: {
      type: new GraphQLList(ListItemType),
      async resolve() {
        const result = await ListItem.find({}).populate('list', Lists);
        return result;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: ListItemType,
      args: {
        text: { type: GraphQLString },
      },
      resolve(parent, args) {
        const list = new Lists({
          title: 'New List',
        });
        list.save();

        const item = new ListItem({
          list: list._id, //eslint-disable-line
          text: args.text,
        });
        return item.save();
      },
    },
    updateItem: {
      type: ListItemType,
      args: {
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        done: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        const result = await ListItem.findOneAndUpdate({ _id: args.id }, args);
        return result;
      },
    },
    removeItem: {
      type: ListItemType,
      args: {
        _id: { type: GraphQLString },
      },
      resolve(parent, id) {
        ListItem.findByIdAndRemove(id)
          .then(removedistItem => removedistItem)
          .catch(err => console.log(err));//eslint-disable-line
      },
    },
    addList: {
      type: ListType,
      args: {
        _id: { type: GraphQLString },
      },
      async resolve(parent, id) {
        const list = new Lists({
          title: 'New List',
        });
        list.save();

        const result = ListItem.findByIdAndUpdate(id, { $push: { list: list._id } }, { new: true }); //eslint-disable-line
        return result;
      },
    },
    editList: {
      type: ListType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const result = await Lists.findOneAndUpdate({ _id: args.id }, args);
        return result;
      },
    },
    deleteList: {
      type: ListType,
      args: {
        _id: { type: GraphQLString },
      },
      async resolve(parent, id) {
        const result = await Lists.findByIdAndRemove(id);//eslint-disable-line
        return result;
      },
    },
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

exports.default = Schema;
