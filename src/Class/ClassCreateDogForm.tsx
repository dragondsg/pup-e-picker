import { Component } from "react";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<{
  addDog: (name: string, description: string, img: string) => void;
  closeCreatePopup: () => void;
}> {
  state: {
    dogName: string;
    dogDescription: string;
    dogImg: string;
  } = {
    dogName: "",
    dogDescription: "",
    dogImg: defaultSelectedImage,
  };
  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.addDog(this.state.dogName, this.state.dogDescription, this.state.dogImg);
          this.props.closeCreatePopup();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={this.state.dogName}
          onChange={(e) => {
            this.setState({ dogName: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={this.state.dogDescription}
          onChange={(e) => {
            this.setState({ dogDescription: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={this.state.dogImg}
          onChange={(e) => {
            this.setState({ dogImg: e.target.value });
          }}
          disabled={false}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
