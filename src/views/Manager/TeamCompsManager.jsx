import styled from "styled-components";
import React, { Fragment } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  InputNumber,
} from "antd";
import { db } from "../../firebase/main";
import { collection, addDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { DataContext } from "contexts/DataContext";

const { Title } = Typography;

function SynergysManager() {
  const { championsData, itemsData } = useContext(DataContext);
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);
  const [numberOptions, setNumberOptions] = useState(1);

  function createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <Fragment key={i}>
          <Form.Item required label="replace from" name={"replace_from" + (i+1)}>
            <Select
              mode="multiple"
              placeholder="replace from"
              style={{ width: "100%" }}
            >
              <Select.Option value="lvlup">lvlup</Select.Option>
              {members.map((c) => (
                <Select.Option key={c} value={c}>
                  {c}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"replace_to" + (i+1)} label="replace to">
            <Select
              mode="multiple"
              placeholder="replace to"
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
        </Fragment>
      );
    }
    return elements;
  }

  const onFinish = async (values) => {
    // prepare data
    let data = {};
    data.options = [];
    for (let i = 0; i < numberOptions; i++) {
      data.options.push({
        replace_from: values[`replace_from${i+1}`],
        replace_to: values[`replace_to${i+1}`],
      })
    }
    data.members = [];
    members.forEach((m) => {
      if (values[`items${m.toLowerCase().split(" ").join("_")}`] === undefined)
        values[`items${m.toLowerCase().split(" ").join("_")}`] = [];
      data.members.push({
        name: m,
        position: values[`position${m.toLowerCase().split(" ").join("_")}`],
        max_level: values[`max_level${m.toLowerCase().split(" ").join("_")}`],
        items: values[`items${m.toLowerCase().split(" ").join("_")}`],
      });
    });
    data.early_comp = values.early_comp;
    data.name = values.name;
    data.type = values.type;
    data.tier = values.tier;
    data.status = values.status;
    data.carousel = values.carousel;
    // create document
    try {
      const docRef = await addDoc(collection(db, "teamcomps"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      throw new Error(error);
    }
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
            initialValues={{
              status: null
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Input />
            </Form.Item>
            <Form.Item label="tier" name="tier">
              <Input />
            </Form.Item>
            <Form.Item label="status" name="status">
              <Input />
            </Form.Item>
            <Form.Item label="early comp" name="early_comp">
              <Select mode="multiple">
                {championsData.map((c) => {
                  return (
                    <Select.Option
                      value={c.champion_name}
                      key={c.champion_name}
                    >
                      {c.champion_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="carousel" name="carousel">
              <Select mode="multiple">
                {itemsData
                  .filter((i) => i.is_combined === "false")
                  .map((c) => {
                    return (
                      <Select.Option value={c.item_name} key={c.item_name}>
                        {c.item_name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
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
            {members.length > 0 && (
              <Fragment>
                <Form.Item label="options">
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={(value) => setNumberOptions(value)}
                  />
                </Form.Item>
                {createElements(numberOptions)}
              </Fragment>
            )}
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
