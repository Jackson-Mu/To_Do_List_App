import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    if (inputText.trim() !== "") {
      setItems((prevItems) => [
        ...prevItems,
        { text: inputText, status: "Not Started" },
      ]);
      setInputText("");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }

  function toggleStatus(index) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              status:
                item.status === "To be Started"
                  ? "In Progress"
                  : item.status === "In Progress"
                  ? "Completed"
                  : "To be Started",
            }
          : item
      )
    );
  }

  function deleteItem(index) {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  }

  return (
    <div className="container">
      <div>
        <h1 className="heading">To-Do List</h1>
        <p className="header">
          Add your tasks below and click on them to update their status.
        </p>
        <p className="header">
          Mark them as "In Progress" or "Completed" by clicking on them.
        </p>
        <p className="header">
          Use the delete button to remove a task if needed.
        </p>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          type="text"
          value={inputText}
          placeholder="Add a new task here..."
        />
        <button onClick={addItem}>
          <span>Add Task</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <li key={index}>
              <span className="task" onClick={() => toggleStatus(index)}>
                {todoItem.text} - {todoItem.status}
              </span>
              <span className="actions">
                <button onClick={() => deleteItem(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
