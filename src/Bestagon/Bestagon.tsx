import React from "react";
import "react-gallery-carousel/dist/index.css";
import Carousel from "react-gallery-carousel";
import { ArticleHeader } from "../components/ArticleHeader";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.png";
import image5 from "./images/5.png";
import image6 from "./images/6.png";
import image7 from "./images/7.png";

const Bestagon: React.FC = () => {
  return (
    <>
      <ArticleHeader
        title="Bestagon"
        subtitle="Combining density with greenery"
        image={image1}
        author={{
          name: "Alexis Gros",
          email: "alexis.gros99@gmail.com",
          website: "https://alexisgros.fr",
        }}
        creationDate="2024-09-23"
        updatedDate="2024-09-23"
        version="1.0"
      />

      <p>
        I have been wondering what was the limit to city densities before they
        become too oppressive. Pushing 1970s urbanism to its logical conclusion,
        I decided to use blender to visualise what such a city would look like.
        I made a city pattern with a density of 20000 people per square
        kilometer, which is very dense, similar to the center of Paris. Made the
        towers taller, to free up large parcs, each almost the size of
        Disneyland between building rows. And of course, since Hexagons are
        bestagons, I made the pattern hexagonal.
      </p>

      <p>
        Put all the roads underground, public transports, most people even have
        a view, mixed zone commerce and offices. Walkable and bikeable and
        sustenable. There, I made it, the perfect city, wasn't that hard. Surely
        there are absolutely zero problems with this design.
      </p>

      <Carousel
        images={[
          { src: image4 },
          { src: image1 },
          { src: image2 },
          { src: image3 },
          { src: image5 },
          { src: image6 },
          { src: image7 },
        ]}
        style={{ height: 500, width: "100%" }}
      />
    </>
  );
};

export default Bestagon;
