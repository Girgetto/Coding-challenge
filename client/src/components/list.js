import React from "react";
import {
  axiosGraphQL,
  GET_ORGANIZATION,
  ADD_ITEM,
  REMOVE_ORGANIZATION,
  UPDATE_ORGANIZATION
} from "../lib/api";
import get from "lodash/get";
import Toggle from "react-toggle";

export default class List extends React.Component {
  state = {
    listItem: [],
    updatingId: "",
    updatingText: ""
  };

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
              return (
                <div key={item._id}>
                  <button
                    onClick={event => {
                      let index = listItem.indexOf(item);
                      this.setState({
                        listItem: this.array_move(listItem, index, --index)
                      });
                    }}
                  >
                    UP
                  </button>
                  <button
                    onClick={event => {
                      let index = listItem.indexOf(item);
                      this.setState({
                        listItem: this.array_move(listItem, index, ++index)
                      });
                    }}
                  >
                    DOWN
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
                    - {item.list.title} - {item._id}{" "}
                  </span>
                  <button
                    onClick={() => {
                      this.removeList(item._id);
                    }}
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
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
                  <Toggle
                    defaultChecked={item.done}
                    onChange={() => {
                      this.handleUpdate(item._id, item.done, item.text);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
