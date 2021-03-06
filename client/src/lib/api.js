import axios from "axios";

export const axiosGraphQL = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const GET_ORGANIZATION = `
  {
    ListItem{
      list {
        _id
        title
      }
      _id
      done
      text
    }
  }
`;

export const ADD_ITEM = text => {
  return `
  mutation{
    addItem(text:"${text}"){
      _id
      text
      done
    }
  }
`;
};

export const REMOVE_ORGANIZATION = id => {
  return `
    mutation{
      removeItem(_id:"${id}"){
        _id
      }
    }
`;
};

export const UPDATE_ORGANIZATION = (id, args) => {
  return `
    mutation{
      updateItem(id:"${id}",done:${args.done},text:"${args.text}"){
        _id
        text
        done
      }
    }
`;
};

export const UPDATE_LIST_ITEM = (id, args) => {
  return `
    mutation{
      editList(id:"${id}",title:"${args.title}"){
        _id
        title
      }
    }
`;
};

export const ADD_LIST = (id) =>{
  return `
  mutation{
    addList(_id:"${id}"){
      _id
    }
  }
  `
}

export const REMOVE_LIST = (id)=>{
 return `
  mutation{
    deleteList(_id:"${id}"){
      _id
    }
  }
 `
}
