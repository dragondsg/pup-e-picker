export const baseUrl = "http://localhost:3000";
const serverURL = "http://localhost:3000/dogs";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => fetch(serverURL).then((response) => response.json()),
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (name: string, description: string, img: string) => {
    return fetch(serverURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        image: img,
        description: description,
        isFavorite: false,
      }),
      redirect: "follow",
    });
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(serverURL + "/" + id, {
      method: "DELETE",
    });
  },

  updateDog: (id: number, fav: boolean) => {
    return fetch(serverURL + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isFavorite: fav,
      }),
      redirect: "follow",
    });
  },
};
