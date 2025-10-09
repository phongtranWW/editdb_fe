import { Modal } from "antd";

interface LoaderProps {
  isVisible: boolean;
  message?: string;
}

export default function LoaderModal({ isVisible, message }: LoaderProps) {
  return (
    <Modal
      open={isVisible}
      footer={null}
      closable={false}
      maskClosable={false}
      centered
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-[100px] h-[100px]">
          {/* First block */}
          <div
            className="absolute w-[30px] h-[30px] top-1/2 left-1/2 bg-blue-600 animate-[up_2.4s_cubic-bezier(0,0,0.24,1.21)_infinite]"
            style={{ boxSizing: "border-box" }}
          />

          {/* Second block */}
          <div
            className="absolute w-[30px] h-[30px] bg-orange-500 animate-[down_2.4s_cubic-bezier(0,0,0.24,1.21)_infinite]"
            style={{
              boxSizing: "border-box",
              top: "calc(50% - 30px)",
              left: "calc(50% - 30px)",
            }}
          />

          <style>{`
            @keyframes down {
              0%,
              100% {
                transform: none;
              }
              25% {
                transform: translateX(100%);
              }
              50% {
                transform: translateX(100%) translateY(100%);
              }
              75% {
                transform: translateY(100%);
              }
            }

            @keyframes up {
              0%,
              100% {
                transform: none;
              }
              25% {
                transform: translateX(-100%);
              }
              50% {
                transform: translateX(-100%) translateY(-100%);
              }
              75% {
                transform: translateY(-100%);
              }
            }
          `}</style>
        </div>

        {message && (
          <p className="text-gray-800 text-lg font-medium mt-2">{message}</p>
        )}
      </div>
    </Modal>
  );
}
