import { Form, Input, Button, Switch, Card, Image } from "antd";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();
  const [form] = Form.useForm();

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error || !profile)
    return (
      <div className="text-center text-red-500">
        {error || "No profile found"}
      </div>
    );

  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card
        className="shadow-lg w-full max-w-md"
        title={
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-0">Profile Information</h3>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: profile.name,
            email: profile.email,
            isActive: profile.isActive,
            avatar: profile.avatar,
          }}
        >
          {/* Avatar section - centered */}
          <div className="flex justify-center mb-6">
            <Image
              src={profile.avatar}
              width={80}
              height={80}
              referrerPolicy="no-referrer"
              className="rounded-full border-2 border-gray-200"
              preview={false}
              fallback="/default-avatar.png"
            />
          </div>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item
            label="Active Status"
            name="isActive"
            valuePropName="checked"
          >
            <div className="flex items-center">
              <Switch disabled defaultChecked={profile.isActive} />
              <span className="ml-2 text-gray-600">
                {profile.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </Form.Item>

          <Form.Item className="mb-0 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
              disabled
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
