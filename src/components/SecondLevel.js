import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  InputNumber,
  notification,
  PageHeader,
  Typography,
} from "antd";
import Countdown from "react-countdown";

const { Paragraph } = Typography;
const content = (
  <>
    <Paragraph>
      Sulle antakse ette lahendid ning sa pead selle kiiresti sisse kirjutama
    </Paragraph>
    <Paragraph>
      Selleks on sul aega 60 sekundit, et kirjutada 15 vastust
    </Paragraph>
  </>
);

function generateNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function generatePointer() {
  const number = Math.floor(Math.random() * 2 + 1);
  return number === 1;
}

const SecondLevel = (props) => {
  const [running, setRunning] = useState(false);
  const [date, setDate] = useState(Date.now());
  const inputRef = React.useRef(null);
  const [form] = Form.useForm();

  const [numb1, setNum1] = useState(generateNumber);
  const [numb2, setNum2] = useState(generateNumber);
  const [pointer, setPointer] = useState(generatePointer);

  const [score, setScore] = useState(0);

  const onFinish = (values) => {
    if (pointer) {
      if (numb1 + numb2 === parseInt(values.value)) {
        notification.success({ message: "Correct" });
        setScore(score + 1);
      } else {
        notification.error({ message: "Wrong" });
      }
    } else {
      if (numb1 - numb2 === parseInt(values.value)) {
        notification.success({ message: "Correct" });
        setScore(score + 1);
      } else {
        notification.error({ message: "Wrong" });
      }
    }

    setNum1(generateNumber);
    setNum2(generateNumber);
    setPointer(generatePointer);
    form.resetFields();
    inputRef.current.focus({
      cursor: "start",
    });
  };

  const onFinishFailed = () => {
    notification.error({ message: "Please input your number!" });
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      if (score >= 5) {
        notification.success({ message: "Success!" });
        props.setLevel(2);
      } else {
        setScore(0);
      }
      setRunning(false);
      return null;
    } else {
      return (
        <div>
          <h1>Time: {seconds}</h1>
          <h1>Score: {score} / 5</h1>
          <h1>
            {numb1} {pointer ? "+" : "-"} {numb2}
          </h1>

          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Value"
              name="value"
              rules={[
                {
                  required: true,
                  message: "Please input your number!",
                },
              ]}
            >
              <InputNumber ref={inputRef} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  };

  return (
    <Card>
      {!running && (
        <div>
          <PageHeader className="home-page-header" title="Math">
            {content}
          </PageHeader>
          <Button
            type={"primary"}
            onClick={() => {
              setRunning(true);
              setDate(Date.now() + 60000);
            }}
          >
            Edasi
          </Button>
        </div>
      )}
      {running && (
        <div>
          <Countdown date={date} renderer={renderer} />
        </div>
      )}
    </Card>
  );
};

export default SecondLevel;
