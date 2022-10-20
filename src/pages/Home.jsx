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
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const result = await publicRequest.get(`${pathName}/1.json`);
        result.status === 200 && setProjects(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    pathName !== "/" && getProjects();
  }, [pathName]);

  const sortHandler = useCallback((e) => {
    if (e.target.abbr === "Time") {
      setProjects((prev) => [...prev].sort((a, b) => a.time - b.time));
    }
    if (e.target.abbr === "Title") {
      setProjects((prev) =>
        [...prev].sort((a, b) => a.title.length - b.title.length)
      );
    }
    if (e.target.abbr === "Domain") {
      setProjects((prev) =>
        [...prev].sort((a, b) => {
          if (!a.domain) {
            return 0;
          }
          if (!b.domain) {
            return -1;
          }
          if (!a.domain && !b.domain) {
            return 0;
          }
          return a.domain.length - b.domain.length;
        })
      );
    }
  }, []);

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
          />
        ) : (
          <h3>{pathName !== "/" ? "Loading..." : "Hello user"}</h3>
        )}
      </main>
    </div>
  );
};

export default Projects;
