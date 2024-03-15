import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { SelectedTab } from "../types";
import { DogsContext } from "../Providers/DogProvider";

export const FunctionalSection = ({
  children,
  tabSelected,
  setTabSelected,
}: {
  children: ReactNode;
  tabSelected: SelectedTab;
  setTabSelected: React.Dispatch<React.SetStateAction<SelectedTab>>;
}) => {
  const {allDogs, setAllDogs} = useContext(DogsContext);

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
