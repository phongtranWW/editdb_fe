import { Flex } from "antd";
import { ProfileCard } from "../components/App/Profile/ProfileCard";
import { SummaryDiagramContainer } from "../components/App/Profile/SummaryDiagramContainer";

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative">
        <Flex
          vertical
          align="center"
          justify="center"
          className="!p-8 !max-w-6xl !mx-auto"
          gap={32}
        >
          <ProfileCard />
          <SummaryDiagramContainer />
        </Flex>
      </div>
    </div>
  );
}
