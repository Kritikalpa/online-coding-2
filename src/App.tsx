import { useState } from "react";
import "./App.css";
import { tasks } from "./data";

type Task = {
  id: number;
  category: string;
  title: string;
  status: string;
  description: string;
};

function App() {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [searchedTasks, setSearchedTasks] = useState<Array<Task> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleDone = (id: number) => {
    setCurrentTasks(
      currentTasks.map((item, index) => {
        if (id === item.id) {
          return {
            ...item,
            status: "completed",
          };
        } else return item;
      })
    );
  };

  const handleDelete = (id: number) => {
    setCurrentTasks(currentTasks?.filter((item) => item.id !== id));
  };

  const addNewTask = (title: string, description: string, category: string) => {
    setCurrentTasks((prev) => [
      ...prev,
      {
        id: 1089,
        category: category,
        title: title,
        description: description,
        status: "pending",
      },
    ]);
  };

  const searchTask = (category: string) => {
    setSearchedTasks(
      currentTasks?.filter((item) => item.category === category)
    );
  };

  const handleCancel = () => {
    searchText && setSearchText("");
    searchedTasks && setSearchedTasks(null);
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderTaskCards = (item: Task, index: number): JSX.Element => {
    return (
      <div
        key={`task-${index}`}
        className={item?.status === "completed" ? "highlight" : ""}
      >
        <div>
          <div>{item?.title}</div>
          <div>{item?.description}</div>
        </div>
        <button onClick={() => handleDone(item?.id)}>Done</button>
        <button onClick={() => handleDelete(item?.id)}>Delete</button>
      </div>
    );
  };

  return (
    <div>
      <div>Zania Task Management System</div>
      <div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Task
        </button>
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            searchTask(searchText);
          }}
        >
          Search
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <div>
        {searchedTasks
          ? searchedTasks?.map((item, index) => renderTaskCards(item, index))
          : currentTasks?.map((item, index) => renderTaskCards(item, index))}
      </div>
      {isOpen && (
        <div>
          <div>Add New Task</div>
          <div>
            <div>Title</div>
            <input onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div>
            <div>Description</div>
            <input
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <div>Category</div>
            <input onChange={(e) => handleChange("category", e.target.value)} />
          </div>
          <div>
            <button
              onClick={() => {
                addNewTask(
                  formData?.title,
                  formData?.description,
                  formData?.category
                );
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
