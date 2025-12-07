import { systemInfo } from "../../../utils";
import CustomSwitch from "../CustomSwitch";
import { Card, CardContent, Stack, Divider } from "@mui/material";
import { SectionHeading, SectionDescription } from "../settings.styled";

export default function GeneralTab() {
  return (
    <Stack spacing={3}>
      {/* Categories */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>Task Categories</SectionHeading>
          <SectionDescription>
            Manage how tasks are grouped inside your Taskflow App.
          </SectionDescription>

          <Divider sx={{ my: 2 }} />

          <CustomSwitch
            settingKey="enableCategories"
            header="Enable Categories"
            text="Organize your tasks using categories for better clarity."
          />
        </CardContent>
      </Card>

      {/* App Badge */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>App Badge</SectionHeading>
          <SectionDescription>
            Display badges on your installed Taskflow PWA icon.
          </SectionDescription>

          <Divider sx={{ my: 2 }} />

          <CustomSwitch
            settingKey="appBadge"
            header="PWA App Badge"
            text="Show a badge on the app icon indicating the number of remaining tasks."
            disabled={!systemInfo.isPWA || !("setAppBadge" in navigator)}
            disabledReason="This feature only works if Taskflow is installed as a PWA and the browser supports badges."
          />
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>Completed Tasks</SectionHeading>
          <SectionDescription>
            Control how completed tasks appear in your Taskflow lists.
          </SectionDescription>

          <Divider sx={{ my: 2 }} />

          <CustomSwitch
            settingKey="doneToBottom"
            header="Send Completed Tasks to Bottom"
            text="Automatically move completed tasks below active ones."
          />
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>Progress Visualization</SectionHeading>
          <SectionDescription>
            Track your productivity visually inside Taskflow.
          </SectionDescription>

          <Divider sx={{ my: 2 }} />

          <CustomSwitch
            settingKey="showProgressBar"
            header="Show Progress Bar"
            text="Display a progress bar at the top of the screen based on completed tasks."
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
