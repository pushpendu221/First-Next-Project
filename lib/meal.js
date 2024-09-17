import fs from "node:fs"; // to handle file system
import sql from "better-sqlite3";
import xss from "xss";
import slugify from "slugify";
import { redirect } from "next/navigation";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //throw new Error(<h1>Error Generated!!</h1>);
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE SLUG=?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); // to generate slug
  meal.instrustion = xss(meal.instruction); // to filter from cross orgin attack

  const extention = meal.image.name.split(".").pop(); // popping out extenstion from the image;
  const fileName = `${meal.slug}.${extention}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`); // create steam for the Image file
  const bufferedImage = await meal.image.arrayBuffer(); // to get array of image chunck

  stream.write(Buffer.from(bufferedImage), (error) => {
    // converting array buffer to regular Buffer.
    if (error) {
      throw new error("Error uploading Image");
    }
  });
  meal.image = `/images/${fileName}`; // we don't use public as by default root is public
  db.prepare(
    `
    INSERT INTO meals (title,image,summary,instructions,creator,creator_email,slug)
    VALUES (
    @title,
    @image,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @slug
    )
    `
  ).run(meal);
  // db.prepare(`DELETE FROM meals WHERE rowid = 8`).run();
  redirect("/");
}
