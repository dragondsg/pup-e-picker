import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, SelectedTab } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

type ClassAppStateType = {
  allDogs: Dog[];
  tabSelected: SelectedTab;
};
export class ClassApp extends Component<
  Record<string, never>,
  ClassAppStateType
> {
  state: ClassAppStateType = {
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
      return Requests.deleteDog(id)
        .then(refetch)
        .then(() => {
          toast.success("Dog deleted.");
        })
        .catch(() => {
          toast.error("Dog failed to delete.");
        });
    };

    const updateDogFav = (id: number, fav: boolean) => {
      return Requests.updateDog(id, fav).then(refetch);
    };

    const addDog = (name: string, description: string, img: string) => {
      return Requests.postDog(name, description, img)
        .then(refetch)
        .then(() => {
          toast.success("Dog added.");
        })
        .catch(() => {
          toast.error("Dog failed to add.");
        });
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
            <ClassCreateDogForm addDog={addDog} />
          )}
        </ClassSection>
      </div>
    );
  }
}
