import { Emoji, EmojiStyle } from "emoji-picker-react";
import CustomRadioGroup from "../CustomRadioGroup";
import { SectionDescription, SectionHeading } from "../settings.styled";
import { useOnlineStatus } from "../../../hooks/useOnlineStatus";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { DeleteRounded, WifiOffRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import CustomSwitch from "../CustomSwitch";
import { showToast } from "../../../utils";
import type { OptionItem } from "../settingsTypes";
import { OPTION_ICON_SIZE } from "../settingsConstants";

const emojiStyles: OptionItem<EmojiStyle>[] = [
  { label: "Apple", value: EmojiStyle.APPLE },
  { label: "Facebook", value: EmojiStyle.FACEBOOK },
  { label: "Discord", value: EmojiStyle.TWITTER },
  { label: "Google", value: EmojiStyle.GOOGLE },
  { label: "Native", value: EmojiStyle.NATIVE },
].map(({ label, value }) => ({
  label,
  value,
  icon: <Emoji emojiStyle={value} unified="1f60e" size={OPTION_ICON_SIZE} />,
}));

const offlineDisabled = emojiStyles
  .map((o) => o.value)
  .filter((v) => v !== EmojiStyle.NATIVE);

export default function EmojiTab() {
  const { user, setUser } = useContext(UserContext);
  const [emojiStyleValue, setEmojiStyleValue] = useState<EmojiStyle>(
    user.emojisStyle,
  );

  const [hasEmojiData, setHasEmojiData] = useState<boolean>(
    !!localStorage.getItem("epr_suggested"),
  );

  const isOnline = useOnlineStatus();

  useEffect(() => {
    setEmojiStyleValue(user.emojisStyle);
  }, [user.darkmode, user.emojisStyle]);

  return (
    <Stack spacing={3}>
      {/* Emoji Style Card */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>Emoji Style</SectionHeading>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
            Choose how emojis appear across the app.
          </Typography>

          <CustomRadioGroup
            options={emojiStyles}
            value={emojiStyleValue}
            onChange={(val) => {
              setEmojiStyleValue(val);
              setUser((prev) => ({ ...prev, emojisStyle: val }));
            }}
            disabledOptions={isOnline ? [] : offlineDisabled}
          />

          {!isOnline && (
            <Alert
              severity="warning"
              sx={{ mt: 2, borderRadius: "12px" }}
              icon={<WifiOffRounded />}
            >
              <AlertTitle>Offline Mode</AlertTitle>
              Some emoji styles might not load while offline.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Simple Emoji Picker Card */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>Simple Emoji Picker</SectionHeading>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Enables a lighter emoji picker with recently used emojis.
          </Typography>

          <CustomSwitch
            settingKey="simpleEmojiPicker"
            header="Enable Simple Picker"
            text="Only show recently used emojis for faster loading."
            disabled={!hasEmojiData}
            disabledReason="No recent emoji data found."
          />
        </CardContent>
      </Card>

      {/* Emoji Data Clearing */}
      <Card elevation={2} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <SectionHeading>Emoji Data</SectionHeading>
          <SectionDescription>
            Manage the stored data for your recently used emojis.
          </SectionDescription>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="flex-start">
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteRounded />}
              onClick={() => {
                localStorage.removeItem("epr_suggested");
                showToast("Emoji history cleared.");
                setHasEmojiData(false);

                if (user.settings.simpleEmojiPicker) {
                  setUser((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, simpleEmojiPicker: false },
                  }));
                }
              }}
            >
              Clear Emoji History
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
