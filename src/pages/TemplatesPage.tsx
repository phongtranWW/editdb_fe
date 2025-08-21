import { Flex, Space, Typography, Input, Select, List } from "antd";
import { useTemplates } from "../hooks/useTemplates";
import TemplateCard from "../components/App/Templates/TemplateCard";
const { Paragraph, Title } = Typography;
const { Search } = Input;

export default function TemplatesPage() {
  const { diagrams, total, params, updateParams } = useTemplates();

  return (
    <Flex vertical className="w-full" align="center" justify="center">
      <Space direction="vertical" className="flex flex-col items-center py-8">
        <Title level={1} className="!font-bold !text-6xl">
          Templates
        </Title>
        <Paragraph className="!text-2xl">
          Design, visualize and collaborate on entity relationship diagrams for
          your databases.
        </Paragraph>
        <Search
          placeholder="Search templates"
          size="large"
          enterButton={
            <Select
              placeholder="Sort by"
              size="large"
              options={[
                {
                  value: "asc",
                  label: "Ascending",
                },
                {
                  value: "desc",
                  label: "Descending",
                },
              ]}
              value={params.sort}
              onChange={(value) => {
                updateParams({
                  ...params,
                  sort: value,
                });
              }}
            />
          }
          value={params.search}
          onChange={(e) => {
            updateParams({
              ...params,
              search: e.target.value,
            });
          }}
        />
        <List
          pagination={{
            total,
            pageSize: params.limit,
            current: params.page,
            onChange: (page) => {
              updateParams({
                ...params,
                page,
              });
            },
          }}
          className="!w-full !p-5"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
          }}
          dataSource={diagrams}
          renderItem={(item) => (
            <List.Item>
              <TemplateCard diagram={item} />
            </List.Item>
          )}
        />
      </Space>
    </Flex>
  );
}
