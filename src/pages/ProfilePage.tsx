import { Flex } from "antd";
import { ProfileCard } from "../components/App/Profile/ProfileCard";
import { SummaryDiagramContainer } from "../components/App/Profile/SummaryDiagramContainer";

export default function ProfilePage() {
  return (
    <Flex vertical align="center" justify="center" className="!p-8" gap={32}>
      <ProfileCard />
      <SummaryDiagramContainer />
    </Flex>
  );
}
