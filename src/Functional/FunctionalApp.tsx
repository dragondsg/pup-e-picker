import { useState, useEffect } from "react";
import { Dog, SelectedTab } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [tabSelected, setTabSelected] = useState<SelectedTab>("none-selected");

  const refetch = () => Requests.getAllDogs().then(setAllDogs);

  useEffect(() => {
    refetch();
  }, []);

  function deleteDog(id: number) {
    return Requests.deleteDog(id)
      .then(refetch)
      .then(() => {
        toast.success("Dog deleted.");
      })
      .catch(() => {
        toast.error("Dog failed to delete.");
      });
  }

  function updateDogFav(id: number, fav: boolean) {
    return Requests.updateDog(id, fav)
      .then(refetch);
      /*.then(() => {
        toast.success("Dog updated.");
      })
      .catch(() => {
        toast.error("Dog failed to update.");
      });*/
  }

  function addDog(name: string, description: string, img: string) {
    return Requests.postDog(name, description, img)
      .then(refetch)
      .then(() => {
        toast.success("Dog added.");
      })
      .catch(() => {
        toast.error("Dog failed to add.");
      });
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
          <FunctionalCreateDogForm addDog={addDog} />
        )}
      </FunctionalSection>
    </div>
  );
}
