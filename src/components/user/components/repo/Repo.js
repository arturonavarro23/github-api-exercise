import React from 'react';
import { faStar, faBalanceScale, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Repo = ({ repo }) => (
  <div className="repo">
    <h5>{repo.name}</h5>
    <p>
      {repo.description}
    </p>
    <p>
      {repo.language && (
        <span className="info">
          <FontAwesomeIcon icon={faCircle} /> {repo.language}
        </span>)}
      <span className="info">
        <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
      </span>
      {repo.license && repo.license.name && (
        <span className="info">
          <FontAwesomeIcon icon={faBalanceScale} /> {repo.license.name}
        </span>)}
    </p>
  </div>
);

export default Repo;
