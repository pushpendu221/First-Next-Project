"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
export default function ImagePicker({ name, label }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function imageButtonClickHandler() {
    return imageInput.current.click();
  }

  function imageChangeHandler(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    // it converts image to dataUrl to use a input Image object
    fileReader.readAsDataURL(file); // it doesn't return anything so we call onload function.

    fileReader.onload = () => {
      // below gets the fileurl
      setPickedImage(fileReader.result);
    };
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image Picked Yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image Uploaded by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={imageChangeHandler}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={imageButtonClickHandler}
        >
          ImagePicker
        </button>
      </div>
    </div>
  );
}
