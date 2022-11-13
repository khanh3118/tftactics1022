import styled from "styled-components";
import React, { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Upload, Typography, Select } from "antd";
import { db, storage } from "../../firebase/main";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

const { TextArea } = Input;
const { Title } = Typography;

const OPTIONS = [
  "B.F. Sword",
  "Chain Vest",
  "Giant's Belt",
  "Needlessly Large Rod",
  "Negatron Cloak",
  "Recurve Bow",
  "Sparring Gloves",
  "Spatula",
  "Tear of the Goddess",
];
const OPTIONS_STATS = [
  "damage",
  "health",
  "atk_spd",
  "mr",
  "mana",
  "crit",
  "armor",
  "magic",
  "dodge",
];

function SynergysManager() {
  const [stats, setStats] = useState([]);
  const [statsValue, setStatsValue] = useState({});

  const filteredOptionsStats = OPTIONS_STATS.filter((o) => !stats.includes(o));

  const [form] = Form.useForm();
  const [img, setImg] = useState("");
  const onFinish = async (values) => {
    const metadata = {
      contentType: img.type,
    };
    const imgRef = ref(storage, `items/${img.name}`);
    uploadBytes(imgRef, img, metadata).then(async (snapshot) => {
      let item_image = await getDownloadURL(
        ref(storage, snapshot.metadata.fullPath)
      );
      try {
        const docRef = await addDoc(collection(db, "items"), {
          ...values,
          item_image,
          item_stats: statsValue,
        });
        console.log("Document written with ID: ", docRef.id);
        form.resetFields();
      } catch (error) {
        throw new Error(error);
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  function hanleImg(file) {
    setImg(file);
  }
  function hanleStatsChange(e, name) {
    setStatsValue((pre) => {
      return {
        ...pre,
        [`item_stat_${name}`]: e.target.value,
      };
    });
  }
  return (
    <ItemsManagerDefault>
      <Wrapper className="wrapper">
        <Title align="center">Create Item</Title>
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
            is_combined: "true",
            is_unique_item: "false",
            is_aura_item: "false",
            recipe_1: null,
            recipe_2: null,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Item Name"
            name="item_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Stats">
            <Select
              mode="multiple"
              placeholder="select stats"
              value={stats}
              onChange={setStats}
              style={{ width: "100%" }}
            >
              {filteredOptionsStats.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {stats.map((item) => {
            return (
              <Form.Item
                key={item}
                label={"Item " + item}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input onChange={(e) => hanleStatsChange(e, item)} />
              </Form.Item>
            );
          })}
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="is_combined"
            label="Can be craft ?"
          >
            <Select>
              <Select.Option value="true">true</Select.Option>
              <Select.Option value="false">false</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="is_trait"
            label="trait item ?"
          >
            <Select>
              <Select.Option value="true">true</Select.Option>
              <Select.Option value="false">false</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="is_unique_item"
            label="Unique ?"
          >
            <Select>
              <Select.Option value="true">true</Select.Option>
              <Select.Option value="false">false</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="is_aura_item"
            label="Aura ?"
          >
            <Select>
              <Select.Option value="true">true</Select.Option>
              <Select.Option value="false">false</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="recipe_1" label="Recipe Item 1">
            <Select>
              {OPTIONS.map((item) => (
                <Select.Option key={item} value={item.toLowerCase()}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="recipe_2" label="Recipe Item 2">
            <Select>
              {OPTIONS.map((item) => (
                <Select.Option key={item} value={item.toLowerCase()}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Item Image" valuePropName="fileList">
            <Upload
              beforeUpload={(e) => hanleImg(e)}
              maxCount="1"
              action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="item_description"
            label="Item Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Create Synergy">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </ItemsManagerDefault>
  );
}

export default SynergysManager;

const ItemsManagerDefault = styled.div``;

const Wrapper = styled.div`
  padding-top: 50px;
  max-width: 1200px;
  margin: 0 auto;
`;
