import { dogPictures } from "../dog-pictures";
import { useState } from "react";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  addDog,
  closeCreatePopup,
}: {
  addDog: (name: string, description: string, img: string) => void;
  closeCreatePopup: () => void;
}) => {
  const [dogName, setDogName] = useState<string>("");
  const [dogDescription, setDescription] = useState<string>("");
  const [dogImg, setDogImg] = useState<string>(defaultSelectedImage);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        addDog(dogName, dogDescription, dogImg);
        closeCreatePopup();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        value={dogName}
        onChange={(e) => {
          setDogName(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={dogDescription}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={dogImg}
        onChange={(e) => {
          setDogImg(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
