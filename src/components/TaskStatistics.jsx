import { Card, Statistic, Row, Col } from "antd";
import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

export default function TaskStatistics({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isDone).length;
  // const urgentTasks = tasks.filter((task) => {
  //   const now = moment();
  //   const deadline = moment(task.deadlineTime);
  //   return !task.isDone && deadline.diff(now, "hours") <= 12;
  // }).length;

  return (
    <div className="my-4">
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Tổng số công việc"
              value={totalTasks}
              prefix={<UnorderedListOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Đã hoàn thành"
              value={completedTasks}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        {/* <Col span={12}> */}
        {/* <Card>
            <Statistic
              title="Cần xử lý gấp"
              value={urgentTasks}
              prefix={
                <ExclamationCircleOutlined style={{ color: "#f5222d" }} />
              }
            />
          </Card> */}
        {/* </Col> */}
      </Row>
    </div>
  );
}
