import React from "react";
import { Helmet } from "react-helmet-async";
import "react-gallery-carousel/dist/index.css";
import Carousel from "react-gallery-carousel";
import "./PostIndustrialSociety.css";
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
      <Helmet>
        <title>Bestagon</title>
        <meta name="description" content="Bestagon" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=yes"
        />
        <meta name="author" content="Alexis Gros" />
        <meta name="dcterms.date" content="2024-09-23" />
        <link rel="icon" href={image1} />
      </Helmet>
      <table className="header">
        <tr>
          <td colSpan={2} rowSpan={2} className="width-auto">
            <h1 className="title">Bestagon</h1>
            <span className="subtitle">Combining density with greenery</span>
          </td>
          <th>Version</th>
          <td className="width-min">v1.0</td>
        </tr>
        <tr>
          <th>Updated</th>
          <td className="width-min">
            <time style={{ whiteSpace: "pre" }}>2024-09-23</time>
          </td>
        </tr>

        <tr>
          <th className="width-min">Author</th>
          <td className="width-auto">
            <a href="https://alexisgros.fr">
              <cite>Alexis Gros</cite>
            </a>{" "}
            alexis.gros99@gmail.com
          </td>
          <th className="width-min">License</th>
          <td>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="license noopener noreferrer"
            >
              <img
                alt="Creative Commons Attribution 4.0 International License"
                style={{ borderWidth: 0, verticalAlign: "middle" }}
                src="https://i.creativecommons.org/l/by/4.0/88x31.png"
              />
            </a>
          </td>
        </tr>
      </table>

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
