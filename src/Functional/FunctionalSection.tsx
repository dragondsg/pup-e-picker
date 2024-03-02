import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, SelectedTab } from "../types";

export const FunctionalSection = ({
  children,
  allDogs,
  tabSelected,
  setTabSelected,
}: {
  children: ReactNode;
  allDogs: Dog[];
  tabSelected: SelectedTab;
  setTabSelected: React.Dispatch<React.SetStateAction<SelectedTab>>;
}) => {
  const favoritedDogsCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedDogsCount = allDogs.filter((dog) => !dog.isFavorite).length;

  function toggleTab( tab:SelectedTab ){
    if (tabSelected == tab) {
      setTabSelected("none-selected");
    } else {
      setTabSelected(tab);
    }
  }

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
              tabSelected == "favorited" ? `selector active` : `selector`
            }
            onClick={() => {
              toggleTab("favorited")
            }}
          >
            favorited ( {favoritedDogsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={
              tabSelected == "unfavorited" ? `selector active` : `selector`
            }
            onClick={() => {
              toggleTab("unfavorited")
            }}
          >
            unfavorited ( {unfavoritedDogsCount} )
          </div>
          <div
            className={
              tabSelected == "create-form" ? `selector active` : `selector`
            }
            onClick={() => {
              toggleTab("create-form")
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
