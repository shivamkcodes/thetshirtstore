const { API } = require("../../backend");

export const createContact = (userId, token, query) => {
  console.log(query);

  return fetch(`${API}/contact/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query.values),
  })
    .then((Response) => {
      console.log(Response);

      return Response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllContacts = () => {
  return fetch(`${API}/allContacts`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteQuery = (userId, token, contactId) => {
  return fetch(`${API}/contact/${contactId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
