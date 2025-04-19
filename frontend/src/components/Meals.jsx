import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import { useContext } from "react";
import UserProgressContext from "../store/userProgressContext.jsx";

const requestConfig = {};

export default function Meals() {
  const userProgressCtx = useContext(UserProgressContext);
  const API_URL = userProgressCtx.API_URL;

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(API_URL + "/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }

  if (error) {
    return <Error title="Falied to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
