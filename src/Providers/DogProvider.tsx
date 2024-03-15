import { createContext, ReactNode, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

type TDogs = {
  allDogs: Dog[];
  setAllDogs: (input: Dog[]) => void;
  deleteDog: (id: number) => Promise<void>;
  updateDogFav: (id: number, fav: boolean) => Promise<void>;
  addDog: (name: string, description: string, img: string) => Promise<void>;
};

export const DogsContext = createContext<TDogs>({} as TDogs);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const refetch = () => Requests.getAllDogs().then(setAllDogs);

  function deleteDog(id: number) {
    setAllDogs(allDogs.filter((dog) => dog.id != id));
    return Requests.deleteDog(id)
      .then(() => {
        toast.success("Dog deleted.");
      })
      .catch(() => {
        toast.error("Dog failed to delete.");
        refetch();
      });
  }

  function updateDogFav(id: number, fav: boolean) {
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
    return Requests.updateDog(id, fav)
      .then(() => {
        //toast.success("Dog updated.");
      })
      .catch(() => {
        //toast.error("Dog failed to update.");
        refetch();
      });
  }

  function addDog(name: string, description: string, img: string) {
    let tempDog = {
      name: name,
      image: img,
      description: description,
      isFavorite: false,
      id: Math.max(...allDogs.map((dog) => dog.id)) + 1,
    };
    setAllDogs(allDogs.concat(tempDog));
    return Requests.postDog(name, description, img)
      .then(() => {
        toast.success("Dog added.");
      })
      .catch(() => {
        toast.error("Dog failed to add.");
        refetch();
      });
  }

  return (
    <DogsContext.Provider value={{ allDogs, setAllDogs, deleteDog, updateDogFav, addDog }}>
      {children}
    </DogsContext.Provider>
  );
};
