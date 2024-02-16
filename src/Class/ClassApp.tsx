import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, selectedTab } from "../types";
import { Requests } from "../api";

export class ClassApp extends Component {
  state: {
    allDogs: Dog[],
    tabSelected: selectedTab
  } = {
    allDogs: [],
    tabSelected: 'none-selected'
  };

  componentDidMount(): void {
    Requests.getAllDogs().then((dogs) => {
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
      <div className="App" style={{ backgroundColor: "orange" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          tabSelected={this.state.tabSelected}
          setTabSelected={(tab) => {
            this.setState({ tabSelected: tab });
          }}
        >
          {this.state.tabSelected!='create-form' && (
            <ClassDogs
              dogs={allDogs.filter(
                (dog) => filterDogs(dog, this.state.tabSelected)
              )}
              updateDogFav={updateDogFav}
              deleteDog={deleteDog}
            />
          )}
          {this.state.tabSelected=='create-form' && (
            <ClassCreateDogForm
              addDog={addDog}
              closeCreatePopup={() => this.setState({ tabSelected: 'none-selected' })}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
