import "./App.css";
("use client");

import { useState, useEffect } from "react";
import { Layout, Typography, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import TaskForm from "./components/TaskForm";
import TaskStatistics from "./components/TaskStatistics";
import TaskList from "./components/TaskList";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let result = tasks;

    // Filter
    if (filterStatus !== "all") {
      result = result.filter((task) =>
        filterStatus === "completed" ? task.isDone : !task.isDone
      );
    }

    // Search
    if (searchTerm) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "deadline") {
        return (
          new Date(a.deadlineTime).getTime() -
          new Date(b.deadlineTime).getTime()
        );
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    setFilteredTasks(result);
  }, [tasks, searchTerm, filterStatus, sortBy]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <Layout className="min-h-screen">
      <Content className="container mx-auto p-4">
        <Title level={2} className="mb-4">
          Quản lý Công việc
        </Title>
        <TaskForm addTask={addTask} />
        <TaskStatistics tasks={tasks} />
        <div className="my-4 flex space-x-4">
          <Input
            placeholder="Tìm kiếm công việc"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={(value) => setFilterStatus(value)}
          >
            <Option value="all">Tất cả</Option>
            <Option value="ongoing">Đang diễn ra</Option>
            <Option value="completed">Đã hoàn thành</Option>
          </Select>
          <Select
            defaultValue="deadline"
            style={{ width: 200 }}
            onChange={(value) => setSortBy(value)}
          >
            <Option value="deadline">Sắp xếp theo Deadline</Option>
            <Option value="title">Sắp xếp theo Tên</Option>
          </Select>
          <CSVLink
            data={tasks}
            filename={"tasks.csv"}
            className="ant-btn ant-btn-primary"
          >
            Xuất CSV
          </CSVLink>
        </div>
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      </Content>
    </Layout>
  );
}
