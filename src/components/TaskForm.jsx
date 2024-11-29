import { Form, Input, DatePicker, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

export default function TaskForm({ addTask }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const now = moment();
    const start = moment(values.startTime.toDate());
    const deadline = moment(values.deadlineTime.toDate());

    // Kiểm tra điều kiện: thời gian bắt đầu phải lớn hơn tối thiểu 30 phút so với hiện tại
    if (start.isBefore(now.add(30, "minutes"))) {
      message.error(
        "Thời gian bắt đầu phải lớn hơn thời gian hiện tại ít nhất 30 phút"
      );
      return;
    }

    if (deadline.isSameOrBefore(start)) {
      message.error("Thời gian kết thúc phải lớn hơn thời gian bắt đầu");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: values.title,
      startTime: start.toISOString(),
      deadlineTime: deadline.toISOString(),
      isDone: false,
    };

    addTask(newTask);
    form.resetFields();
    message.success("Thêm công việc thành công");
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="inline" className="mb-4">
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
      >
        <Input placeholder="Tên công việc" />
      </Form.Item>
      <Form.Item
        name="startTime"
        rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu" }]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          placeholder="Thời gian bắt đầu"
        />
      </Form.Item>
      <Form.Item
        name="deadlineTime"
        rules={[
          { required: true, message: "Vui lòng chọn thời gian kết thúc" },
        ]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          placeholder="Thời gian kết thúc"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Thêm công việc
        </Button>
      </Form.Item>
    </Form>
  );
}
