import styled from "styled-components";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Upload, Typography, Select } from "antd";
import { db, storage } from "../../firebase/main";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useContext } from "react";
import { DataContext } from "contexts/DataContext";
import { useEffect } from "react";

const { TextArea } = Input;
const { Title } = Typography;

function SynergysManager() {
  const { championsData, itemsData } = useContext(DataContext);
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);
  const onFinish = async (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  function hanleChange(e) {
    setMembers([...e]);
  }
  return (
    championsData &&
    itemsData && (
      <OriginsManagerDefault>
        <Wrapper className="wrapper">
          <Title align="center">Create TeamComp</Title>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item required label="Team members" name="members">
              <Select
                mode="multiple"
                placeholder="select multi item"
                value={members}
                onChange={(e) => hanleChange(e)}
                style={{ width: "100%" }}
              >
                {championsData.map((c, i) => (
                  <Select.Option
                    key={c.champion_name + i}
                    value={c.champion_name}
                  >
                    {c.champion_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {members.map((name, index) => {
              return (
                <React.Fragment key={name}>
                  <Form.Item
                    required
                    name={"position" + name.toLowerCase().split(" ").join("_")}
                    label={"position" + name}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    required
                    name={"max_level" + name.toLowerCase().split(" ").join("_")}
                    label={"max_level" + name}
                  >
                    <Select style={{ width: "100%" }}>
                      <Select.Option value={true}>true</Select.Option>
                      <Select.Option value={false}>false</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={"items" + name.toLowerCase().split(" ").join("_")}
                    label="Items recommend"
                  >
                    <Select
                      mode="multiple"
                      placeholder="select multi item"
                      value={items}
                      onChange={setItems}
                      style={{ width: "100%" }}
                    >
                      {itemsData.map((c, index) => (
                        <Select.Option
                          key={c.item_name + index}
                          value={c.item_name}
                        >
                          {c.item_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </React.Fragment>
              );
            })}
            <Form.Item label="Create Synergy">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Wrapper>
      </OriginsManagerDefault>
    )
  );
}

export default SynergysManager;

const OriginsManagerDefault = styled.div``;

const Wrapper = styled.div`
  padding-top: 50px;
  max-width: 1200px;
  margin: 0 auto;
`;
