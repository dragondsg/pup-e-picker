import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, selectedTab } from "../types";

export class ClassSection extends Component<{
  children: ReactNode;
  allDogs: Dog[];
  tabSelected: selectedTab;
  setTabSelected: (tab: selectedTab) => void;
}> {
  render() {
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
                this.props.tabSelected=='favorited' ? `selector active` : `selector`
              }
              onClick={() => {
                if (this.props.tabSelected=='favorited') {
                  this.props.setTabSelected('none-selected');
                } else {
                  this.props.setTabSelected('favorited');
                }
              }}
            >
              favorited ({" "}
              {this.props.allDogs.filter((dog) => dog.isFavorite).length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                this.props.tabSelected=='unfavorited' ? `selector active` : `selector`
              }
              onClick={() => {
                if (this.props.tabSelected=='unfavorited') {
                  this.props.setTabSelected('none-selected');
                } else {
                  this.props.setTabSelected('unfavorited');
                }
              }}
            >
              unfavorited ({" "}
              {this.props.allDogs.filter((dog) => !dog.isFavorite).length} )
            </div>
            <div
              className={this.props.tabSelected=='create-form' ? `selector active` : `selector`}
              onClick={() => {
                if (this.props.tabSelected=='create-form') {
                  this.props.setTabSelected('none-selected');
                } else {
                  this.props.setTabSelected('create-form');
                }
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
