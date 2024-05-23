const ListItem = (props) => {
  return (
    <div className="listItem">
      <h2>ID pracownika: {props.userId}</h2>
      <p>Zadanie: {props.title}</p>
      <p>Status zadania: {props.completed ? "Zakończone" : "W trakcie"}</p>
    </div>
  );
};

export default ListItem;
