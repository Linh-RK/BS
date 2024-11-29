import { useState } from "react";
import {
  List,
  Button,
  Input,
  DatePicker,
  Popconfirm,
  message,
  Tag,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import moment from "moment";

export default function TaskList({
  tasks,
  deleteTask,
  editTask,
  toggleTaskCompletion,
}) {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = () => {
    if (editingTask) {
      editTask(editingTask);
      setEditingTask(null);
      message.success("Cập nhật công việc thành công");
    }
  };

  const isDeadlineNear = (deadline) => {
    const now = moment();
    const deadlineDate = moment(deadline);
    const timeDiff = deadlineDate.diff(now, "hours");
    return timeDiff <= 12 && timeDiff > 0;
  };

  const getStatusTag = (task) => {
    if (task.isDone) {
      return <Tag color="green">Đã hoàn thành</Tag>;
    } else if (isDeadlineNear(task.deadlineTime)) {
      return <Tag color="red">Gần hết hạn</Tag>;
    } else {
      return <Tag color="blue">Đang thực hiện</Tag>;
    }
  };

  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          className={`p-4 border rounded mb-4 ${
            isDeadlineNear(task.deadlineTime) && !task.isDone
              ? "bg-red-100"
              : ""
          }`}
        >
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{task.title}</h3>
              {getStatusTag(task)}
            </div>
            <p>Bắt đầu: {moment(task.startTime).format("DD/MM/YYYY HH:mm")}</p>
            <p>
              Kết thúc: {moment(task.deadlineTime).format("DD/MM/YYYY HH:mm")}
            </p>
            <div className="mt-2 space-x-2">
              <Button
                onClick={() => toggleTaskCompletion(task.id)}
                icon={task.isDone ? <UndoOutlined /> : <CheckOutlined />}
                type="primary"
                className={
                  task.isDone
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }
              >
                {task.isDone ? "Hoàn tác" : "Hoàn thành"}
              </Button>
              <Button
                onClick={() => handleEdit(task)}
                icon={<EditOutlined />}
                type="default"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sửa
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa công việc này?"
                onConfirm={() => deleteTask(task.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="default"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Xóa
                </Button>
              </Popconfirm>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}
