import React from "react";
import {
  axiosGraphQL,
  GET_ORGANIZATION,
  ADD_ITEM,
  REMOVE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  UPDATE_LIST_ITEM,
  ADD_LIST,
  REMOVE_LIST
} from "../lib/api";
import get from "lodash/get";
import Toggle from "react-toggle";
import logo from '../assets/img/descarga.png'

export default class List extends React.Component {
  state = {
    listItem: [],
    updatingId: "",
    updatingText: "",
    updatingIdList: "",
    updatingTextList: ""
  };

  deleteList(id) {
    axiosGraphQL.post("", { query: REMOVE_LIST(id) }).then(() => {
      this.componentDidMount();
    });
  }

  addList(id) {
    axiosGraphQL.post("", { query: ADD_LIST(id) }).then(() => {
      this.componentDidMount();
    });
  }

  listUpdate(id, title) {
    axiosGraphQL
      .post("", { query: UPDATE_LIST_ITEM(id, { title }) })
      .then(() => {
        this.componentDidMount();
      });
  }

  handleUpdate(id, done, str) {
    let bool = !done;
    axiosGraphQL
      .post("", { query: UPDATE_ORGANIZATION(id, { done: bool, text: str }) })
      .then(() => {
        this.componentDidMount();
      });
  }

  removeList(id) {
    let selectedList = this.state.listItem.filter(list => list._id == id);
    selectedList[0].list.map(elemItem => {
      this.deleteList(elemItem._id);
    });
    axiosGraphQL.post("", { query: REMOVE_ORGANIZATION(id) }).then(() => {
      this.componentDidMount();
    });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    if (this.state.value) {
      axiosGraphQL.post("", { query: ADD_ITEM(this.state.value) }).then(() => {
        this.componentDidMount();
      });
    }
    this.state.value = "";
    event.preventDefault();
  };

  componentDidMount() {
    axiosGraphQL
      .post("", { query: GET_ORGANIZATION })
      .then(({ data }) => {
        this.setState({
          listItem: get(data, "data.ListItem", [])
        });
      })
      .catch(err => console.error(err));
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
        <div className="flex">
          <form onSubmit={this.handleSubmit}>
            <label>
              ADD CARD
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
          </form>
          <div className="flex">
          <img src={logo} className="logo"></img>
          <h1>Iron Notes</h1>
          </div>
        </div>
        <div>
          {listItem.length==0 ? '':
          listItem.length &&
            listItem.map(item => {
              const isItemUpdating = this.state.updatingId === item._id;
              return (
                <div key={item._id} className="list flex animated bounceInDown">
                  <div>
                    <button
                      className="arrow-button"
                      onClick={event => {
                        let index = listItem.indexOf(item);
                        if (index != 0) {
                          this.setState({
                            listItem: this.array_move(listItem, index, --index)
                          });
                        }
                      }}
                    >
                      ⬆
                    </button>
                    <button
                      className="arrow-button"
                      onClick={event => {
                        let index = listItem.indexOf(item);
                        if (index!=listItem.length-1) {
                          this.setState({
                            listItem: this.array_move(listItem, index, ++index)
                          });
                        }
                      }}
                    >
                      ⬇
                    </button>
                    <span>
                      {isItemUpdating ? (
                        <input
                          defaultValue={item.text}
                          onChange={event =>
                            this.setState({ updatingText: event.target.value })
                          }
                        />
                      ) : (
                        item.text
                      )}
                      <button
                        onClick={() => {
                          this.setState(() => ({
                            updatingId: !isItemUpdating ? item._id : "",
                            updatingText: item.text
                          }));
                          if (this.state.updatingId) {
                            this.handleUpdate(
                              item._id,
                              item.done,
                              this.state.updatingText
                            );
                          }
                        }}
                      >
                        {isItemUpdating ? "SAVE" : "UPDATE"}
                      </button>
                      <button
                        onClick={event => {
                          this.addList(item._id);
                        }}
                      >
                        + ADD LIST
                      </button>
                      <div className="item">
                        {item.list.map((element, i) => {
                          const isListUpdating =
                            this.state.updatingIdList === element._id;
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
                              <button
                                className="arrow-button"
                                onClick={event => {
                                  this.setState(() => ({
                                    updatingIdList: !isListUpdating
                                      ? element._id
                                      : "",
                                    updatingTextList: element.title
                                  }));
                                  if (this.state.updatingIdList) {
                                    this.listUpdate(
                                      element._id,
                                      this.state.updatingTextList
                                    );
                                  }
                                }}
                              >
                                {isListUpdating ? "SAVE" : "EDIT"}
                              </button>
                              <button
                                className="arrow-button"
                                onClick={event => {
                                  this.deleteList(element._id);
                                }}
                              >
                                DELETE
                              </button>
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
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.removeList(item._id);
                      }}
                    >
                      DELETE CARD
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
