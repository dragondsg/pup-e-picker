import { useState, useEffect, useContext } from "react";
import { SelectedTab } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { DogsContext } from "../Providers/DogProvider";

export function FunctionalApp() {
  const {allDogs, setAllDogs, deleteDog, updateDogFav, addDog} = useContext(DogsContext);
  const [tabSelected, setTabSelected] = useState<SelectedTab>("none-selected");

  const refetch = () => Requests.getAllDogs().then(setAllDogs);

  useEffect(() => {
    refetch();
  }, []);

  const filteredDogs = allDogs.filter((dog): boolean => {
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
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
        >
          <FunctionalDogs
            dogs={filteredDogs}
            updateDogFav={updateDogFav}
            deleteDog={deleteDog}
          />
          {tabSelected == "create-form" && (
            <FunctionalCreateDogForm addDog={addDog} />
          )}
        </FunctionalSection>
      </div>
  );
}
