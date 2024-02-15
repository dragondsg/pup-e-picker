import { useState, useEffect } from "react";
import { Dog } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

const serverURL = "http://localhost:3000/dogs";
const getAllDogs = () => fetch(serverURL).then((response) => response.json());

function setServerDogFavorite(id: number, fav: boolean) {
  fetch(serverURL + "/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      isFavorite: fav,
    }),
    redirect: "follow",
  });
}

function deleteServerDog(id: number) {
  fetch(serverURL + "/" + id, {
    method: "DELETE",
  });
}

function addServerDog(name: string, description: string, img: string) {
  fetch(serverURL, {
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
}

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [tabSelected, setTabSelected] = useState<[boolean, boolean]>([
    true,
    false,
  ]);

  const [favoritesOn, createPopupOpen] = tabSelected;

  useEffect(() => {
    getAllDogs().then(setAllDogs);
  }, []);

  function setWebsiteDogFavorite(id: number, fav: boolean) {
    setAllDogs(
      allDogs.map((dog) => {
        if (dog.id != id) {
          return dog;
        } else {
          let tempDog = dog;
          tempDog.isFavorite = fav;
          return tempDog;
        }
      })
    );
  }

  function addWebsiteDog(name: string, description: string, img: string) {
    let tempDog = {
      name: name,
      image: img,
      description: description,
      isFavorite: false,
      id: Math.max(...allDogs.map((dog) => dog.id)) + 1,
    };
    setAllDogs(allDogs.concat(tempDog));
  }

  function deleteDog(id: number) {
    setAllDogs(allDogs.filter((dog) => dog.id != id));
    deleteServerDog(id);
  }

  function updateDogFav(id: number, fav: boolean) {
    setServerDogFavorite(id, fav);
    setWebsiteDogFavorite(id, fav);
  }

  function addDog(name: string, description: string, img: string) {
    addServerDog(name, description, img);
    addWebsiteDog(name, description, img);
  }

  function closeCreatePopup() {
    setTabSelected([favoritesOn, false]);
  }

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
      >
        {!createPopupOpen && (
          <FunctionalDogs
            dogs={allDogs.filter((dog) => dog.isFavorite == favoritesOn)}
            updateDogFav={updateDogFav}
            deleteDog={deleteDog}
          />
        )}
        {createPopupOpen && (
          <FunctionalCreateDogForm
            addDog={addDog}
            closeCreatePopup={closeCreatePopup}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
