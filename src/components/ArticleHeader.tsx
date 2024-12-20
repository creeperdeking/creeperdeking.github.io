import React from "react";
import "./reset.css";
import "./reportstyle.css";
import { Helmet } from "react-helmet-async";

interface Author {
  name: string;
  email: string;
  website: string;
}

export const ArticleHeader: React.FC<{
  title: string;
  subtitle: string;
  image: string;
  author: Author;
  creationDate: string;
  updatedDate: string;
  version: string;
}> = ({
  title,
  subtitle,
  image,
  author,
  creationDate,
  updatedDate,
  version,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Growth and Transportation" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=yes"
        />
        <meta name="author" content={author.name} />
        <meta name="dcterms.date" content={creationDate} />
        <meta name="dcterms.modified" content={updatedDate} />
        <link rel="icon" href={image} />
      </Helmet>
      <table className="header">
        <tr>
          <td colSpan={2} rowSpan={3} className="width-auto">
            <h1 className="title">{title}</h1>
            <span className="subtitle">{subtitle}</span>
          </td>
          <th>Version</th>
          <td className="width-min">{version}</td>
        </tr>
        <tr>
          <th>Updated</th>
          <td className="width-min">
            <time style={{ whiteSpace: "pre" }}>{updatedDate}</time>
          </td>
        </tr>
        <tr>
          <th>Created</th>
          <td className="width-min">
            <time style={{ whiteSpace: "pre" }}>{creationDate}</time>
          </td>
        </tr>

        <tr>
          <th className="width-min">Author</th>
          <td className="width-auto">
            <a href={author.website}>
              <cite>{author.name}</cite>
            </a>{" "}
            {author.email}
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
    </>
  );
};
