import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  dogs: Dog[];
  updateDogFav: (id: number, fav: boolean) => void;
  deleteDog: (id: number) => void;
}> {
  render() {
    return (
      <>
        {this.props.dogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              this.props.deleteDog(dog.id);
            }}
            onHeartClick={() => {
              this.props.updateDogFav(dog.id, false);
            }}
            onEmptyHeartClick={() => {
              this.props.updateDogFav(dog.id, true);
            }}
            isLoading={false}
          />
        ))}
      </>
    );
  }
}
