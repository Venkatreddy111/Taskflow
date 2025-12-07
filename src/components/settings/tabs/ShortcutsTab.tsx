import { systemInfo } from "../../../utils";
import ShortcutItem from "../ShortcutItem";

export default function ShortcutsTab() {
  const cmdOrCtrl = systemInfo.isAppleDevice ? "Cmd" : "Ctrl";

  return (
    <>
      <ShortcutItem
        name="Quick Export"
        description="Save all tasks and download them as a JSON file"
        keys={[cmdOrCtrl, "S"]}
      />

      <ShortcutItem
        name="Quick Search"
        description="Focus the task search bar"
        keys={[cmdOrCtrl, "/"]}
      />

      <ShortcutItem
        name="Print Tasks"
        description="Print the current Taskflow list"
        keys={[cmdOrCtrl, "P"]}
      />

      <ShortcutItem
        name="Toggle Theme"
        description="Switch between light and dark mode"
        keys={[cmdOrCtrl, "Shift", "L"]}
      />

      {/* Future feature: Sidebar shortcuts */}
      {/* 
      <ShortcutItem
        name="Toggle Sidebar"
        description="Open or close the Taskflow sidebar"
        keys={[cmdOrCtrl, "B"]}
      />
      */}
    </>
  );
}
