import Table from "../components/Table/Table";
import React, { useCallback } from "react";
import Menu from "../components/Menu/Menu";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "./../requestMethods";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sortedField, setSortedField] = useState({});
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const result = await publicRequest.get(`${pathName}/1.json`);
        result.status === 200 && setProjects(result.data);
        result.status === 200 && setSortedField({});
      } catch (err) {
        console.log(err);
      }
    };
    pathName !== "/" && getProjects();
  }, [pathName]);

  const sortHandler = useCallback(
    (e) => {
      if (e.target.abbr) {
        let fieldName = e.target.abbr.toLowerCase();
        setProjects((prev) =>
          [...prev].sort((a, b) => {
            if (!a[fieldName]) {
              return 0;
            }
            if (!b[fieldName]) {
              return -1;
            }
            if (!a[fieldName] && !b[fieldName]) {
              return 0;
            }
            if (fieldName === "time") {
              return sortedField[fieldName]
                ? b[fieldName] - a[fieldName]
                : a[fieldName] - b[fieldName];
            }
            return sortedField[fieldName]
              ? b[fieldName].length - a[fieldName].length
              : a[fieldName].length - b[fieldName].length;
          })
        );
        setSortedField({ [fieldName]: !sortedField[fieldName] });
      }
    },
    [sortedField]
  );

  const navigateHandler = useCallback(
    (id, state) => {
      navigate(`/comment/${id}`, state);
    },
    [navigate]
  );

  return (
    <div>
      <Menu />
      <main>
        {projects.length ? (
          <Table
            caption={pathName[1].toUpperCase() + pathName.slice(2)}
            items={projects}
            sortHandler={sortHandler}
            navigateHandler={navigateHandler}
            sortedField={sortedField}
          />
        ) : (
          <h3>{pathName !== "/" ? "Loading..." : "Hello user"}</h3>
        )}
      </main>
    </div>
  );
};

export default Projects;
