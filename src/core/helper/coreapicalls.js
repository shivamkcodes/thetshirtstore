import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const cartEnter = () => {
  if (typeof window !== undefined) {
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
