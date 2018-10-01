const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean, GraphQLList,
} = require('graphql');
const dataStore = require('./dataStore');

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
      resolve: () => dataStore.getData(),
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
      resolve: (parent, args) => dataStore.addItem(args),
    },
    updateItem: {
      type: ListItemType,
      args: {
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        done: { type: GraphQLBoolean },
      },
      resolve: (parent, args) => dataStore.updateItem(parent, args),
    },
    removeItem: {
      type: ListItemType,
      args: {
        _id: { type: GraphQLString },
      },
      resolve: (parent, args) => dataStore.removeItem(parent, args),
    },
    addList: {
      type: ListType,
      args: {
        _id: { type: GraphQLString },
      },
      resolve: (parent, id) => dataStore.addList(parent, id),
    },
    editList: {
      type: ListType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
      },
      resolve: (parent, args) => dataStore.editList(parent, args),
    },
    deleteList: {
      type: ListType,
      args: {
        _id: { type: GraphQLString },
      },
      resolve: (parent, id) => dataStore.deleteList(parent, id),
    },
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

exports.default = Schema;
