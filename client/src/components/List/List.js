import React from "react";
import get from "lodash/get";

import Toggle from "react-toggle";
import ControlBar from '../ControlBar';
import Button from '../Button';
import TopBar from '../TopBar';

import {
  axiosGraphQL,
  GET_ORGANIZATION,
  ADD_ITEM,
  REMOVE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  UPDATE_LIST_ITEM,
  ADD_LIST,
  REMOVE_LIST
} from "../../lib/api";
import './styles.css';

export default class List extends React.Component {
  state = {
    listItem: [],
    updatingId: "",
    updatingText: "",
    updatingIdList: "",
    updatingTextList: ""
  };

  deleteList(id) {
    this.setState({ hasRequested: true })

    axiosGraphQL
      .post("", { query: REMOVE_LIST(id) })
      .then(() => {
        this.setState({ hasRequested: false})
      })
  }

  addList = (id) => {
    this.setState({ hasRequested: true })
    
    axiosGraphQL
      .post("", { query: ADD_LIST(id) })
      .then(() => {
        this.setState({ hasRequested: false})
      })
  }

  moveListItem = (item, isAscending) => {
    const { listItem } = this.state;
    let index = listItem.indexOf(item);
    if (
      (isAscending && index != 0)|| 
      (!isAscending && index < listItem.length - 1)
      ) {
      this.setState({
          listItem: this.array_move(listItem, index, isAscending ? index - 1 : index + 1)
      });
    }
  }

  setItemUpdating = (item, isItemUpdating) => {
    const { updatingId, updatingText } = this.state;
    const { _id, text, done } = item;

    this.setState(() => ({
      updatingId: !isItemUpdating ? _id : "",
      updatingText: isItemUpdating ? updatingText : text,
    }));

    if (updatingId) {
      this.handleUpdate(_id, done, updatingText);
    }
  }

  setListItemUpdating = (element, isListUpdating) => {
    const { updatingIdList, updatingTextList } = this.state;
    const { _id, title, done } = element;

    this.setState(() => ({
      updatingIdList: !isListUpdating ? _id : "",
      updatingTextList: isListUpdating ? updatingTextList : title
    }));

    if (updatingIdList) {
      this.listUpdate(_id, updatingTextList);
    }
  }

  listUpdate(id, title) {
    this.setState({ hasRequested: true })

    axiosGraphQL
      .post("", { query: UPDATE_LIST_ITEM(id, { title }) })
      .then(() => {
        this.setState({ hasRequested: false })
      })
  }

  handleUpdate(id, done, str) {
    let bool = !done;
    this.setState({ hasRequested: true })

    axiosGraphQL
      .post("", { query: UPDATE_ORGANIZATION(id, { done: bool, text: str }) })
      .then(() => {
        this.setState({ hasRequested: false })
      })
  }

  updateItemText = ({ target }) => {
    this.setState({ updatingText: target.value })
  }

  removeList(id) {
    let selectedList = this.state.listItem.filter(list => list._id == id);
    selectedList[0].list.map(elemItem => {
      this.deleteList(elemItem._id);
    });
    this.setState({ hasRequested: true })

    axiosGraphQL
      .post("", { query: REMOVE_ORGANIZATION(id) })
      .then(() => {
        this.setState({ hasRequested: false })
      })
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = value => {
    this.setState({ hasRequested: true })

    if (value) {
      axiosGraphQL.post("", { query: ADD_ITEM(value) })
      .then(() => {
        this.setState({ hasRequested: false })
      })
    }
  };

  updateListFromRequest() {
    axiosGraphQL
    .post("", { query: GET_ORGANIZATION })
    .then(({ data }) => {
      this.setState({
        listItem: get(data, "data.ListItem", []),
      });
    })
    .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasRequested) {
      this.updateListFromRequest();
    }
  }

  componentDidMount() {
    this.updateListFromRequest();
  }

  array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

    return arr;
  };

  render() {
    const { listItem } = this.state;
    return (
      <div>
        <TopBar handleSubmit={this.handleSubmit} />
        <div>
          {listItem.length==0 ? '':
          listItem.length &&
            listItem.map(item => {
              const isItemUpdating = this.state.updatingId === item._id;
              return (
                <div key={item._id} className="list flex animated bounceInDown">
                  <div>
                      <ControlBar 
                          item={item}
                          isItemUpdating={isItemUpdating}
                          handleUpdateItemText={this.updateItemText}
                          handleMoveListItem={this.moveListItem}
                          handleSetItemUpdating={this.setItemUpdating}
                          handleAddList={this.addList}
                      />
                      <div className="item">
                        {item.list.map((element, i) => {
                          const isListUpdating = this.state.updatingIdList === element._id;
                          return (
                            <div key={i}>
                              {isListUpdating ? (
                                <input
                                  defaultValue={element.title}
                                  onChange={event => {
                                    this.setState({
                                      updatingTextList: event.target.value
                                    });
                                  }}
                                />
                              ) : (
                                element.title
                              )}
                              <Button 
                                text={isListUpdating ? "SAVE" : "EDIT"}
                                className="arrow-button"
                                handleClick={() => this.setListItemUpdating(element, isListUpdating)}
                              />
                              <Button 
                                text="DELETE"
                                className="arrow-button"
                                handleClick={() => this.deleteList(element._id)}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <Toggle
                        defaultChecked={item.done}
                        onChange={() => {
                          this.handleUpdate(item._id, item.done, item.text);
                        }}
                      />
                  </div>
                  <Button 
                    text="DELETE CARD"
                    handleClick={() => this.removeList(item._id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
