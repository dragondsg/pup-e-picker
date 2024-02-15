import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

export class ClassSection extends Component<{
  children: ReactNode;
  allDogs: Dog[];
  tabSelected: [boolean, boolean];
  setTabSelected: (fav: boolean, popup: boolean) => void;
}> {
  render() {
    const [favoritesOn, createPopupOpen] = this.props.tabSelected;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={
                favoritesOn && !createPopupOpen ? `selector active` : `selector`
              }
              onClick={() => {
                this.props.setTabSelected( true, false );
              }}
            >
              favorited ({" "}
              {this.props.allDogs.filter((dog) => dog.isFavorite).length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                !favoritesOn && !createPopupOpen
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                this.props.setTabSelected( false, false );
              }}
            >
              unfavorited ({" "}
              {this.props.allDogs.filter((dog) => !dog.isFavorite).length} )
            </div>
            <div
              className={createPopupOpen ? `selector active` : `selector`}
              onClick={() => {
                this.props.setTabSelected( favoritesOn, true );
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
