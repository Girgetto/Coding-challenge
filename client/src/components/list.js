import React from "react";
import {
  axiosGraphQL,
  GET_ORGANIZATION,
  ADD_ITEM,
  REMOVE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  UPDATE_LIST_ITEM
} from "../lib/api";
import get from "lodash/get";
import Toggle from "react-toggle";

export default class List extends React.Component {
  state = {
    listItem: [],
    updatingId: "",
    updatingText: "",
    updatingIdList: "",
    updatingTextList: ""
  };

  listUpdate(id,title) {
    axiosGraphQL
      .post("",{ query: UPDATE_LIST_ITEM(id, { title })})
      .then(()=>{
        this.componentDidMount();
      })
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
    axiosGraphQL.post("", { query: REMOVE_ORGANIZATION(id) }).then(() => {
      this.componentDidMount();
    });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    axiosGraphQL.post("", { query: ADD_ITEM(this.state.value) }).then(() => {
      this.componentDidMount();
    });
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
              Add:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>
          {listItem.length &&
            listItem.map(item => {
              const isItemUpdating = this.state.updatingId === item._id;
              const isListUpdating =
                this.state.updatingIdList === item.list._id;
              return (
                <div key={item._id} className="list flex">
                  <div>
                    <button
                      onClick={event => {
                        let index = listItem.indexOf(item);
                        this.setState({
                          listItem: this.array_move(listItem, index, --index)
                        });
                      }}
                    >
                      ⬆
                    </button>
                    <button
                      onClick={event => {
                        let index = listItem.indexOf(item);
                        this.setState({
                          listItem: this.array_move(listItem, index, ++index)
                        });
                      }}
                    >
                      ⬇
                    </button>
                    <span>
                      TEXT:
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
                      -
                      {isListUpdating ? (
                        <input
                          defaultValue={item.list.title}
                          onChange={event =>
                            this.setState({
                              updatingTextList: event.target.value
                            })
                          }
                        />
                      ) : (
                        item.list.title
                      )}
                      <button
                        onClick={event => {
                          this.setState(() => ({
                            updatingIdList: !isListUpdating
                              ? item.list._id
                              : "",
                            updatingTextList: item.list.title
                          }));
                          if (this.state.updatingIdList) {
                            this.listUpdate(item.list._id,this.state.updatingTextList);
                              //TODO CHIAMARE LA API PER MODIFICARE LIST
                          }
                        }}
                      >
                        {isListUpdating ? "SAVE" : "EDIT"}
                      </button>{" "}
                      -
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
                      DELETE
                    </button>
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
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
