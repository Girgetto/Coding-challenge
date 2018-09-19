import {
  axiosGraphQL,
  GET_ORGANIZATION,
  ADD_ITEM,
} from "../lib/api";

describe("componentDidMount()", () => {
  it("should load data", () => {
    return axiosGraphQL
      .post("", { query: GET_ORGANIZATION })
      .then(({ data }) => {
        expect(data).toBeDefined();
      });
  });

  it("should return a object in array List", () => {
    return axiosGraphQL
      .post("", { query: GET_ORGANIZATION })
      .then(({ data }) => {
        expect(data.data.ListItem[0]).toBeInstanceOf(Object);
      });
  });
});

describe("Add single card", () => {
  const state = {
    value: "Hola"
  };

  it("should add a single card in ListItem", () => {
    return axiosGraphQL
        .post("", { query: ADD_ITEM(state.value) })
        .then(({data})=>{
            expect(data.data.addItem.text).toBe('Hola')
        });
  });
});
