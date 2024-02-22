import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, selectedTab } from "../types";
import { Requests } from "../api";

export class ClassApp extends Component {
  state: {
    allDogs: Dog[];
    tabSelected: selectedTab;
  } = {
    allDogs: [],
    tabSelected: "none-selected",
  };

  componentDidMount(): void {
    Requests.getAllDogs().then((allDogs) =>
      this.setState({
        allDogs: allDogs,
      })
    );
  }

  render() {
    const refetch = () =>
      Requests.getAllDogs().then((allDogs) =>
        this.setState({
          allDogs: allDogs,
        })
      );

    const deleteDog = (id: number) => {
      Requests.deleteDog(id).then(refetch);
    };

    const updateDogFav = (id: number, fav: boolean) => {
      Requests.updateDog(id, fav).then(refetch);
    };

    const addDog = (name: string, description: string, img: string) => {
      Requests.postDog(name, description, img).then(refetch);
    };

    const filteredDogs = this.state.allDogs.filter((dog) => {
      switch (this.state.tabSelected) {
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
      <div className="App" style={{ backgroundColor: "orange" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          allDogs={this.state.allDogs}
          tabSelected={this.state.tabSelected}
          setTabSelected={(tab) => {
            this.setState({ tabSelected: tab });
          }}
        >
          <ClassDogs
            dogs={filteredDogs}
            updateDogFav={updateDogFav}
            deleteDog={deleteDog}
          />
          {this.state.tabSelected == "create-form" && (
            <ClassCreateDogForm
              addDog={addDog}
              closeCreatePopup={() =>
                this.setState({ tabSelected: "none-selected" })
              }
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
