import React, { useState } from "react";
import Countdown from "react-countdown";
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  PageHeader,
  Typography,
} from "antd";
import { WordList } from "../data/WordList";

const { Paragraph } = Typography;

const content = (
  <>
    <Paragraph>
      Sulle antakse ette sõna ning sa pead selle kiiresti sisse kirjutama
    </Paragraph>
    <Paragraph>Selleks on sul aega 30 sekundit, et kirjutada 15 sõna</Paragraph>
  </>
);

const FirstLevel = (props) => {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [word, setWord] = useState(getRandomWord);
  const [date, setDate] = useState(Date.now());
  const [form] = Form.useForm();
  const inputRef = React.useRef(null);

  function getRandomWord() {
    const random = Math.floor(Math.random() * WordList.length);
    return WordList[random];
  }

  const onFinish = (values) => {
    if (values.word === word) {
      setScore(score + 1);
      notification.success({ message: "Correct!" });
    } else {
      notification.error({ message: "Wrong word!" });
    }
    setWord(getRandomWord);
    form.resetFields();
    inputRef.current.focus({
      cursor: "start",
    });
  };

  const onFinishFailed = () => {
    notification.error({ message: "Please input your word!" });
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      if (score >= 15) {
        props.setLevel(1);
      } else {
        setScore(0);
      }
      setRunning(false);
      notification.error({ message: "Out of time!" });
      return null;
    } else {
      return (
        <div>
          <h1>Time: {seconds}</h1>
          <h1>Score: {score} / 15</h1>
          <Paragraph disabled strong>
            Word: {word}
          </Paragraph>
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
              label="Word"
              name="word"
              rules={[
                {
                  required: true,
                  message: "Please input your word!",
                },
              ]}
            >
              <Input ref={inputRef} />
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
          <PageHeader className="home-page-header" title="Writer">
            {content}
          </PageHeader>
          <Button
            type={"primary"}
            onClick={() => {
              setRunning(true);
              setDate(Date.now() + 30000);
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

export default FirstLevel;
