import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";

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

export class ClassApp extends Component {
  state: {
    allDogs: Dog[];
    favoritesOn: boolean;
    createPopupOpen: boolean;
  } = {
    allDogs: [],
    favoritesOn: false,
    createPopupOpen: false,
  };

  componentDidMount(): void {
    getAllDogs().then((dogs) => {
      this.setState({ allDogs: dogs });
    });
  }

  render() {
    const allDogs = this.state.allDogs;
    const setAllDogs = (dogs: Dog[]) => {
      this.setState({ allDogs: dogs });
    };

    const setWebsiteDogFavorite = (id: number, fav: boolean) => {
      this.setState({
        allDogs: allDogs.map((dog) => {
          if (dog.id != id) {
            return dog;
          } else {
            let tempDog = dog;
            tempDog.isFavorite = fav;
            return tempDog;
          }
        }),
      });
    };

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

    return (
      <div className="App" style={{ backgroundColor: "orange" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          tabSelected={[this.state.favoritesOn, this.state.createPopupOpen]}
          setTabSelected={(fav, popup) => {
            this.setState({ favoritesOn: fav, createPopupOpen: popup });
          }}
        >
          {!this.state.createPopupOpen && (
            <ClassDogs
              dogs={allDogs.filter(
                (dog) => dog.isFavorite == this.state.favoritesOn
              )}
              updateDogFav={updateDogFav}
              deleteDog={deleteDog}
            />
          )}
          {this.state.createPopupOpen && (
            <ClassCreateDogForm
              addDog={addDog}
              closeCreatePopup={() => this.setState({ createPopupOpen: false })}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
