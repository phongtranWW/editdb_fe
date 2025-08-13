import { Button, Empty } from "antd";
import { PlusSquareFilled } from "@ant-design/icons";

interface TabContainerProps<T> {
  dataSource: T[];
  addItem: () => void;
  renderItem: (item: T, index?: number) => React.ReactNode;
}

export default function TabContainer<T>({
  dataSource,
  addItem,
  renderItem,
}: TabContainerProps<T>) {
  return (
    <div className="w-ful">
      <div className="flex justify-end px-4">
        <Button type="primary" className="w-full" onClick={addItem}>
          <PlusSquareFilled /> Add
        </Button>
      </div>
      {dataSource.length > 0 ? (
        dataSource.map((item, index) => renderItem(item, index))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}
