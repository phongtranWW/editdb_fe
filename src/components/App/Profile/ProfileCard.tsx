import { Card, Flex, Image, Space, Tag, Typography, Skeleton } from "antd";
import { useProfile } from "../../../hooks/useProfile";

const { Text } = Typography;

export function ProfileCard() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return (
      <Card className="!w-full !p-2 !border-1 !border-gray-300">
        <Skeleton
          active
          avatar={{
            size: 128,
            shape: "circle",
          }}
          paragraph={{
            rows: 2,
            width: ["40%", "60%", "80%", "50%"],
          }}
          title={{
            width: "30%",
          }}
        />
      </Card>
    );
  }

  return (
    <Card className="!w-full !p-2 !border-1 !border-gray-300">
      <Flex align="center" justify="start" gap={32}>
        <Image
          src={profile.avatar || "/default-avatar.png"}
          className="!w-32 !h-32 !rounded-full"
          preview={false}
          fallback="/default-avatar.png"
          referrerPolicy="no-referrer"
        />
        <Space direction="vertical" size="middle">
          <Text className="!text-2xl !font-bold !text-orange-400">
            User Profile
          </Text>
          <Flex align="center" justify="start" className="w-full" gap={32}>
            <Space direction="vertical" size="small">
              <Text className="!text-base !text-gray-600">
                <Text className="!font-semibold !text-lg">ID: </Text>
                {profile.id}
              </Text>
              <Text className="!text-base !text-gray-600">
                <Text className="!font-semibold !text-lg">Name: </Text>{" "}
                {profile.name}
              </Text>
            </Space>
            <Space direction="vertical" size="small">
              <Text className="!text-base !text-gray-600">
                <Text className="!font-semibold !text-lg">Email: </Text>{" "}
                {profile.email}
              </Text>
              <Text className="!text-base !text-gray-600">
                <Text className="!font-semibold !text-lg">Status: </Text>
                <Tag color={profile.isActive ? "green" : "red"}>
                  {profile.isActive ? "Active" : "Inactive"}
                </Tag>
              </Text>
            </Space>
          </Flex>
        </Space>
      </Flex>
    </Card>
  );
}
