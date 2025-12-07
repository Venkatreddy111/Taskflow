import styled from "@emotion/styled";
import {
  CachedRounded,
  CloudOffRounded,
  CloudQueueRounded,
  ExpandMoreRounded,
  Google,
  Microsoft,
  RecordVoiceOverRounded,
  StopCircleRounded,
  VolumeDown,
  VolumeOff,
  VolumeUp,
  WifiOffRounded,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Slider,
  SliderProps,
  Tooltip,
  Card,
  CardContent,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Emoji } from "emoji-picker-react";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { defaultUser } from "../../../constants/defaultUser";
import { UserContext } from "../../../contexts/UserContext";
import { useOnlineStatus } from "../../../hooks/useOnlineStatus";

import type { AppSettings } from "../../../types/user";
import { getFontColor, systemInfo } from "../../../utils";

import CustomSwitch from "../CustomSwitch";
import {
  NoVoiceStyles,
  SectionHeading,
  SectionDescription,
  StyledListSubheader,
  StyledSelect,
} from "../settings.styled";

export default function ReadAloudTab() {
  const { user, setUser } = useContext(UserContext);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceVolume, setVoiceVolume] = useState<number>(user.settings.voiceVolume);
  const [prevVoiceVol, setPrevVoiceVol] = useState<number>(user.settings.voiceVolume);
  const [isSampleReading, setIsSampleReading] = useState<boolean>(false);

  const muiTheme = useMuiTheme();
  const isOnline = useOnlineStatus();

  const readAloudEnabled =
    user.settings.enableReadAloud && "speechSynthesis" in window;

  const getAvailableVoices = React.useCallback((): SpeechSynthesisVoice[] => {
    if (typeof window === "undefined" || !window.speechSynthesis) return [];
    return window.speechSynthesis.getVoices() ?? [];
  }, []);

  useEffect(() => {
    if (!readAloudEnabled) {
      setAvailableVoices([]);
      return;
    }

    const load = () => {
      const list = getAvailableVoices();
      setAvailableVoices(list);
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;

    return () => {
      (window.speechSynthesis as SpeechSynthesis & {
        onvoiceschanged: null | (() => void);
      }).onvoiceschanged = null;
    };
  }, [getAvailableVoices, readAloudEnabled]);

  useEffect(() => {
    if (!readAloudEnabled) return;
    window.speechSynthesis?.cancel();
    setIsSampleReading(false);
  }, [readAloudEnabled]);

  const filteredVoices = useMemo(() => {
    if (!availableVoices.length) return [];

    const unique = availableVoices.filter((v, i, arr) => {
      const first = arr.findIndex(
        (a) =>
          a.lang === v.lang &&
          a.name === v.name &&
          a.voiceURI === v.voiceURI &&
          a.localService === v.localService
      );
      return first === i;
    });

    const lang = navigator.language || "";

    return unique.sort((a, b) => {
      const aMatch = a.lang.startsWith(lang);
      const bMatch = b.lang.startsWith(lang);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a.lang.localeCompare(b.lang);
    });
  }, [availableVoices]);

  const getLanguageRegion = (lang: string): string => {
    if (!lang) return "";
    const parts = lang.split("-");
    if (parts.length < 2) return lang;
    try {
      return new Intl.DisplayNames([lang], { type: "region" }).of(parts[1]) || lang;
    } catch {
      return lang;
    }
  };

  const getFlagUnicodes = (locale: string): string => {
    const region = locale.split("-").pop()?.toUpperCase();
    if (!region || region.length !== 2) return "";
    const points = [...region].map((c) => c.charCodeAt(0) - 65 + 0x1f1e6);
    return points.map((p) => p.toString(16)).join("-");
  };

  const handleVoiceChange = (e: SelectChangeEvent<unknown>): void => {
  const voice = e.target.value as AppSettings["voice"];

  setUser((prev) => ({
    ...prev,
    settings: { ...prev.settings, voice },
  }));
};


  const handleVoiceVolCommitChange: SliderProps["onChangeCommitted"] = (
    _e,
    val
  ) => {
    setUser((prev) => ({
      ...prev,
      settings: { ...prev.settings, voiceVolume: val as number },
    }));
  };

  const handleMuteClick = (): void => {
    const current = voiceVolume;
    setPrevVoiceVol(current);

    const newVol =
      current === 0 ? prevVoiceVol || defaultUser.settings.voiceVolume : 0;

    setUser((prev) => ({
      ...prev,
      settings: { ...prev.settings, voiceVolume: newVol },
    }));

    setVoiceVolume(newVol);
  };

  const handlePlaySample = (): void => {
    if (!readAloudEnabled) return;

    window.speechSynthesis.cancel();

    if (isSampleReading) {
      window.speechSynthesis.pause();
      setIsSampleReading(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(
      "This is a sample text for testing the Taskflow speech feature."
    );

    const voices = window.speechSynthesis.getVoices();
    const preferred = String(user.settings.voice).split("::")[0];

    utter.voice =
      voices.find((v) => v.name === preferred) ?? voices[0] ?? null;
    utter.volume = voiceVolume;
    utter.rate = 1;

    utter.onend = () => setIsSampleReading(false);

    setIsSampleReading(true);
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    setVoiceVolume(user.settings.voiceVolume);
  }, [user.settings.voiceVolume]);

  return (
    <>
      {!("speechSynthesis" in window) && (
        <Alert severity="error">
          <AlertTitle>Speech Synthesis Unsupported</AlertTitle>
          Your browser does not support text-to-speech.
        </Alert>
      )}

      <CustomSwitch
        settingKey="enableReadAloud"
        header="Enable Read Aloud"
        text="Activate text-to-speech and show Read Aloud options inside Taskflow."
        disabled={!("speechSynthesis" in window)}
      />

      <Wrapper active={readAloudEnabled}>
        <Card elevation={2} sx={{ mb: 2 }}>
          <CardContent>
            <SectionHeading>Play Sample</SectionHeading>

            <Button
              variant="contained"
              sx={{
                color: getFontColor(muiTheme.palette.primary.main),
                mt: 1,
              }}
              disabled={!readAloudEnabled}
              onClick={handlePlaySample}
            >
              {isSampleReading ? <StopCircleRounded /> : <RecordVoiceOverRounded />}
              &nbsp;
              {isSampleReading ? "Stop" : "Play Sample"}
            </Button>
          </CardContent>
        </Card>

        <Card elevation={2} sx={{ mb: 2 }}>
          <CardContent>
            <SectionHeading>Voice Selection</SectionHeading>
            <SectionDescription sx={{ mb: 1 }}>
              Choose a voice. Some may require an internet connection.
            </SectionDescription>

            {filteredVoices.length > 0 ? (
              <StyledSelect
                value={String(user.settings.voice)}
                onChange={handleVoiceChange}
                disabled={!readAloudEnabled}
                IconComponent={ExpandMoreRounded}
                translate="no"
                MenuProps={{ PaperProps: { style: { maxHeight: 500 } } }}
              >
                {(() => {
                  const langVoices = filteredVoices.filter((v) =>
                    v.lang.startsWith(navigator.language)
                  );
                  const otherVoices = filteredVoices.filter(
                    (v) => !v.lang.startsWith(navigator.language)
                  );

                  const renderVoice = (voice: SpeechSynthesisVoice) => {
                    const label = voice.name.replace(
                      /^(Google|Microsoft)\s*|\([^()]*\)/gi,
                      ""
                    );
                    const disabled =
                      voice.localService === false && !isOnline;
                    const flag = getFlagUnicodes(voice.lang);

                    return (
                      <MenuItem
                        key={`${voice.name}-${voice.lang}`}
                        value={`${voice.name}::${voice.lang}`}
                        disabled={disabled}
                        sx={{ padding: "10px", borderRadius: "8px" }}
                      >
                        {voice.name.startsWith("Google") && (
                          <Google sx={{ mr: 1 }} />
                        )}
                        {voice.name.startsWith("Microsoft") && (
                          <Microsoft sx={{ mr: 1 }} />
                        )}

                        {label}

                        <Chip
                          sx={{ fontWeight: 500, ml: 1 }}
                          label={getLanguageRegion(voice.lang)}
                          icon={
                            flag ? (
                              <Emoji
                                unified={flag}
                                emojiStyle={user.emojisStyle}
                                size={18}
                              />
                            ) : undefined
                          }
                        />

                        {voice.default &&
                          !["iOS", "macOS"].includes(systemInfo.os) && (
                            <span style={{ fontWeight: 600, marginLeft: 8 }}>
                              Default
                            </span>
                          )}

                        {voice.localService === false && (
                          <span style={{ marginLeft: "auto" }}>
                            {!isOnline ? (
                              <CloudOffRounded sx={{ fontSize: 18 }} />
                            ) : (
                              <Tooltip title="Requires Internet">
                                <CloudQueueRounded sx={{ fontSize: 18 }} />
                              </Tooltip>
                            )}
                          </span>
                        )}
                      </MenuItem>
                    );
                  };

                  return [
                    langVoices.length > 0 && (
                      <StyledListSubheader key="lang">
                        Your Language ({navigator.language})
                      </StyledListSubheader>
                    ),
                    ...langVoices.map(renderVoice),

                    otherVoices.length > 0 && (
                      <StyledListSubheader key="others">
                        Other Languages
                      </StyledListSubheader>
                    ),
                    ...otherVoices.map(renderVoice),
                  ];
                })()}
              </StyledSelect>
            ) : (
              <NoVoiceStyles>
                No voices available.
                <IconButton
                  size="large"
                  onClick={() => setAvailableVoices(getAvailableVoices())}
                >
                  <CachedRounded />
                </IconButton>
              </NoVoiceStyles>
            )}

            {!isOnline &&
              availableVoices.some((v) => v.localService === false) && (
                <Alert severity="warning" sx={{ mt: 2 }} icon={<WifiOffRounded />}>
                  <AlertTitle>Offline Mode</AlertTitle>
                  Some voices need an internet connection.
                </Alert>
              )}
          </CardContent>
        </Card>

        <Card elevation={2}>
          <CardContent>
            <SectionHeading>Voice Volume</SectionHeading>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IconButton onClick={handleMuteClick} aria-label="Toggle mute">
                {voiceVolume === 0 ? (
                  <VolumeOff />
                ) : voiceVolume <= 0.4 ? (
                  <VolumeDown />
                ) : (
                  <VolumeUp />
                )}
              </IconButton>

              <Slider
                sx={{ width: "100%" }}
                value={voiceVolume}
                onChange={(_e, v) => setVoiceVolume(v as number)}
                onChangeCommitted={handleVoiceVolCommitChange}
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) =>
                  v === 0 ? "Muted" : `${Math.floor(v * 100)}%`
                }
              />
            </div>
          </CardContent>
        </Card>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.fieldset<{ active: boolean }>`
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  border: none;
  margin: 0;
  padding: 0;
  transition: opacity 0.2s ease;
`;
