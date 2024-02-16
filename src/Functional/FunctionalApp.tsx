import { useState, useEffect } from "react";
import { Dog, selectedTab } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [tabSelected, setTabSelected] = useState<selectedTab>('none-selected');

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
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
    Requests.deleteDog(id);
  }

  function updateDogFav(id: number, fav: boolean) {
    Requests.updateDog(id, fav);
    setWebsiteDogFavorite(id, fav);
  }

  function addDog(name: string, description: string, img: string) {
    Requests.postDog(name, description, img);
    addWebsiteDog(name, description, img);
  }

  function filterDogs(dog: Dog, tab: selectedTab){
    if(tab == 'none-selected'){
      return true;
    } else {
      return dog.isFavorite == (tab=='favorited');
    }
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
        {tabSelected!='create-form' && (
          <FunctionalDogs
            dogs={allDogs.filter((dog) => filterDogs(dog, tabSelected))}
            updateDogFav={updateDogFav}
            deleteDog={deleteDog}
          />
        )}
        {tabSelected=='create-form' && (
          <FunctionalCreateDogForm
            addDog={addDog}
            closeCreatePopup={()=>setTabSelected('none-selected')}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
