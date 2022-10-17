import React, { memo } from "react";
import "./table.css";

const Table = memo(({ caption, sortHandler, items, navigateHandler }) => {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr onClick={sortHandler}>
          <th abbr='Time'>Time</th>
          <th abbr='Title'>Title</th>
          <th abbr='Domain'>Domain</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            onClick={() => navigateHandler(item.id, { state: { id: item.id } })}
          >
            <td>
              {new Date(item.time * 1000).toLocaleDateString("en-GB", {
                weekday: "short",
                month: "short",
                year: "2-digit",
              })}
            </td>
            <td>{item.title}</td>
            <td>{item.domain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Table;
