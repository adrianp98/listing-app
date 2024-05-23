import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./List.css";

const List = () => {
  const [listData, setListData] = useState([]);
  const [filter, setFilter] = useState("all");

  const getListData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const filterItems = data.filter(
          (item, index, self) =>
            item.userId >= 1 &&
            item.userId <= 10 &&
            index ===
              self.findIndex((element) => element.userId === item.userId)
        );
        setListData(filterItems);
      })
      .catch((error) => console.error("Błąd pobierania danych", error));
  };

  useEffect(() => {
    getListData();
  }, []);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredListData = listData.filter((item) => {
    if (filter === "completed") {
      return item.completed;
    } else if (filter === "pending") {
      return !item.completed;
    }

    return true;
  });

  const mappedListItems = filteredListData.map((item) => (
    <ListItem
      key={item.id}
      userId={item.userId}
      title={item.title}
      completed={item.completed}
    />
  ));
  return (
    <div className="ToDoList">
      <h1>Lista obowiązków</h1>
      <div className="filters">
        <button onClick={() => changeFilter("all")}>Wszystkie zadania</button>
        <button onClick={() => changeFilter("completed")}>
          Ukończone zadania
        </button>
        <button onClick={() => changeFilter("pending")}>
          Trwające zadania
        </button>
      </div>
      <div className="List"> {mappedListItems}</div>
    </div>
  );
};
export default List;
