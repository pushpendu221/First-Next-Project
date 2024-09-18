import { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";
import MealGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meal";

export const metadata = {
  title: "All Meals",
  description: "Delicious meals, from all over the world.",
};

async function Meal() {
  const meals = await getMeals();
  return <MealGrid meals={meals} />;
}

export default function MealFunction() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, Created {""}
          <span className={classes.highlight}>by You.</span>
        </h1>
        <p>
          Choose you Favourite meal and cook it yourself.It is easy and Fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Meal</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Loading Data...</p>}>
          <Meal />
        </Suspense>
      </main>
    </>
  );
}
