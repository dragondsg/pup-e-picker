import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

export const FunctionalSection = ({
  children,
  allDogs,
  tabSelected,
  setTabSelected,
}: {
  children: ReactNode;
  allDogs: Dog[];
  tabSelected: [boolean, boolean];
  setTabSelected: React.Dispatch<React.SetStateAction<[boolean, boolean]>>;
}) => {
  const [favoritesOn, createPopupOpen] = tabSelected;

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
              favoritesOn && !createPopupOpen ? `selector active` : `selector`
            }
            onClick={() => {
              setTabSelected([true, false]);
            }}
          >
            favorited ( {allDogs.filter((dog) => dog.isFavorite).length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={
              !favoritesOn && !createPopupOpen ? `selector active` : `selector`
            }
            onClick={() => {
              setTabSelected([false, false]);
            }}
          >
            unfavorited ( {allDogs.filter((dog) => !dog.isFavorite).length} )
          </div>
          <div
            className={createPopupOpen ? `selector active` : `selector`}
            onClick={() => {
              setTabSelected([favoritesOn, true]);
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
