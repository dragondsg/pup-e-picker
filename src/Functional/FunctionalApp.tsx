import { useState, useEffect } from "react";
import { Dog, selectedTab } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [tabSelected, setTabSelected] = useState<selectedTab>("none-selected");

  const refetch = () => Requests.getAllDogs().then(setAllDogs);

  useEffect(() => {
    refetch();
  }, []);

  function deleteDog(id: number) {
    Requests.deleteDog(id).then(refetch);
  }

  function updateDogFav(id: number, fav: boolean) {
    Requests.updateDog(id, fav).then(refetch);
  }

  function addDog(name: string, description: string, img: string) {
    Requests.postDog(name, description, img).then(refetch);
  }

  const filteredDogs = allDogs.filter((dog) => {
    switch (tabSelected) {
      case "none-selected":
        return true;
      case "favorited":
        return dog.isFavorite;
      case "unfavorited":
        return !dog.isFavorite;
      case "create-form":
        return false;
    }
  });

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
        <FunctionalDogs
          dogs={filteredDogs}
          updateDogFav={updateDogFav}
          deleteDog={deleteDog}
        />
        {tabSelected == "create-form" && (
          <FunctionalCreateDogForm
            addDog={addDog}
            closeCreatePopup={() => setTabSelected("none-selected")}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
