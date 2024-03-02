import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, SelectedTab } from "../types";

export class ClassSection extends Component<{
  children: ReactNode;
  allDogs: Dog[];
  tabSelected: SelectedTab;
  setTabSelected: (tab: SelectedTab) => void;
}> {
  render() {
    const favoritedDogsCount = this.props.allDogs.filter(
      (dog) => dog.isFavorite
    ).length;
    const unfavoritedDogsCount = this.props.allDogs.filter(
      (dog) => !dog.isFavorite
    ).length;

    const toggleTab = (tab: SelectedTab) => {
      if (this.props.tabSelected == tab) {
        this.props.setTabSelected("none-selected");
      } else {
        this.props.setTabSelected(tab);
      }
    };

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
                this.props.tabSelected == "favorited"
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                toggleTab("favorited");
              }}
            >
              favorited ( {favoritedDogsCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                this.props.tabSelected == "unfavorited"
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                toggleTab("unfavorited");
              }}
            >
              unfavorited ( {unfavoritedDogsCount} )
            </div>
            <div
              className={
                this.props.tabSelected == "create-form"
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                toggleTab("create-form");
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
