import { Button, Dropdown, Modal, type MenuProps } from "antd";
import { useMemo, useState } from "react";
import DropdownLabel from "../../UI/DropdownLabel";
import { SHORTCUTS } from "../../../data/shortcut";

export default function HelpDropdown() {
  const [isShowShortcuts, setIsShowShortcuts] = useState(false);

  const helpMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: <DropdownLabel content="Shortcuts" />,
        key: "sider",
        onClick: () => setIsShowShortcuts(!isShowShortcuts),
      },
    ],
    [setIsShowShortcuts, isShowShortcuts]
  );

  return (
    <>
      <Dropdown
        menu={{ items: helpMenuItems }}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <Button type="text" size="small">
          Help
        </Button>
      </Dropdown>

      <Modal
        open={isShowShortcuts}
        onCancel={() => setIsShowShortcuts(false)}
        title={
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-800">
              Keyboard Shortcuts
            </span>
          </div>
        }
        footer={null}
        centered
        width={520}
      >
        <div className="py-2 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1.5">
            {SHORTCUTS.sort((a, b) => a.action.localeCompare(b.action)).map(
              (shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-2.5 py-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700">
                    {shortcut.action}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <div key={keyIndex} className="flex items-center gap-1">
                        <kbd className="px-2 py-0.5 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow-sm min-w-[35px] text-center">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-gray-400 text-xs font-bold">
                            /
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-3 px-2.5 py-2 bg-blue-50 border border-blue-200 rounded">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Tip:</span> Use these shortcuts to
              work faster and more efficiently!
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
