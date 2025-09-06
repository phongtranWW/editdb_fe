import { Card, Flex, Tag, Typography, Skeleton, Avatar } from "antd";
import { useProfile } from "../../../hooks/useProfile";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export function ProfileCard() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return (
      <Card className="!w-full !border-none !shadow-xl !bg-white/80 !backdrop-blur-sm !rounded-2xl">
        <div className="p-6">
          <Skeleton
            active
            avatar={{
              size: 128,
              shape: "circle",
            }}
            paragraph={{
              rows: 3,
              width: ["60%", "80%", "40%"],
            }}
            title={{
              width: "40%",
            }}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="!w-full !border-none !shadow-2xl !bg-white/90 !backdrop-blur-sm !rounded-2xl !overflow-hidden">
      <Flex align="start" justify="start" gap={32} className="relative">
        {/* Avatar Section */}
        <div className="relative">
          <div className="p-1 bg-white rounded-full shadow-lg">
            <Avatar
              size={128}
              src={profile.avatar || "/default-avatar.png"}
              icon={<UserOutlined />}
              className="!border-4 !border-white !shadow-lg"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
            {profile.isActive ? (
              <CheckCircleOutlined className="text-green-500 text-xl" />
            ) : (
              <CloseCircleOutlined className="text-red-500 text-xl" />
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 pt-4">
          <div className="mb-6">
            <Title level={2} className="!mb-2 !text-gray-800 !font-bold">
              {profile.name}
            </Title>
            <Text className="!text-lg !text-gray-600">
              Database Designer & Developer
            </Text>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <IdcardOutlined className="text-blue-600 text-lg" />
                </div>
                <div>
                  <Text className="!text-xs !text-gray-500 !uppercase !tracking-wide !font-medium">
                    User ID
                  </Text>
                  <div className="!text-sm !font-semibold !text-gray-800">
                    {profile.id}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserOutlined className="text-green-600 text-lg" />
                </div>
                <div>
                  <Text className="!text-xs !text-gray-500 !uppercase !tracking-wide !font-medium">
                    Full Name
                  </Text>
                  <div className="!text-sm !font-semibold !text-gray-800">
                    {profile.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MailOutlined className="text-purple-600 text-lg" />
                </div>
                <div>
                  <Text className="!text-xs !text-gray-500 !uppercase !tracking-wide !font-medium">
                    Email Address
                  </Text>
                  <div className="!text-sm !font-semibold !text-gray-800">
                    {profile.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  {profile.isActive ? (
                    <CheckCircleOutlined className="text-orange-600 text-lg" />
                  ) : (
                    <CloseCircleOutlined className="text-orange-600 text-lg" />
                  )}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <Text className="!text-xs !text-gray-500 !uppercase !tracking-wide !font-medium">
                      Account Status
                    </Text>
                    <div className="!text-sm !font-semibold !text-gray-800">
                      Account Status
                    </div>
                  </div>
                  <Tag
                    color={profile.isActive ? "success" : "error"}
                    className="!rounded-full !px-3 !py-1 !font-semibold"
                  >
                    {profile.isActive ? "Active" : "Inactive"}
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </Card>
  );
}
