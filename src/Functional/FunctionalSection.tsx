import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, selectedTab } from "../types";

export const FunctionalSection = ({
  children,
  allDogs,
  tabSelected,
  setTabSelected,
}: {
  children: ReactNode;
  allDogs: Dog[];
  tabSelected: selectedTab;
  setTabSelected: React.Dispatch<React.SetStateAction<selectedTab>>;
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={
              tabSelected=='favorited' ? `selector active` : `selector`
            }
            onClick={() => {
              if (tabSelected=='favorited') {
                setTabSelected('none-selected');
              } else {
                setTabSelected('favorited');
              }
            }}
          >
            favorited ( {allDogs.filter((dog) => dog.isFavorite).length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={
              tabSelected=='unfavorited' ? `selector active` : `selector`
            }
            onClick={() => {
              if (tabSelected=='unfavorited') {
                setTabSelected('none-selected');
              } else {
                setTabSelected('unfavorited');
              }
            }}
          >
            unfavorited ( {allDogs.filter((dog) => !dog.isFavorite).length} )
          </div>
          <div
            className={tabSelected=='create-form' ? `selector active` : `selector`}
            onClick={() => {
              if (tabSelected=='create-form') {
                setTabSelected('none-selected');
              } else {
                setTabSelected('create-form');
              }
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
