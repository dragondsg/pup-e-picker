import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogs,
  updateDogFav,
  deleteDog,
}: {
  dogs: Dog[];
  updateDogFav: (id: number, fav: boolean) => void;
  deleteDog: (id: number) => void;
}) => {
  return (
    <>
      {dogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            deleteDog(dog.id);
          }}
          onHeartClick={() => {
            updateDogFav(dog.id, false);
          }}
          onEmptyHeartClick={() => {
            updateDogFav(dog.id, true);
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
