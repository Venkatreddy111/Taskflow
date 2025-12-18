import { useContext, useEffect, useState } from "react";
import CustomRadioGroup from "../CustomRadioGroup";
import { SectionDescription, SectionHeading, StyledMenuItem, StyledSelect, } from "../settings.styled";
import { UserContext } from "../../../contexts/UserContext";
import { BrightnessAutoRounded, DarkModeRounded, ExpandMoreRounded, LightModeRounded, MotionPhotosAutoRounded, MotionPhotosOffRounded, PersonalVideoRounded, } from "@mui/icons-material";
import { OPTION_ICON_SIZE } from "../settingsConstants";
import CustomSwitch from "../CustomSwitch";
import { useSystemTheme } from "../../../hooks/useSystemTheme";
import { Themes } from "../../../theme/createTheme";
import { ColorElement } from "../../../styles";
const darkModeOptions = [
    {
        label: "Auto",
        value: "auto",
        icon: <BrightnessAutoRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
    {
        label: "System",
        value: "system",
        icon: <PersonalVideoRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
    {
        label: "Light",
        value: "light",
        icon: <LightModeRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
    {
        label: "Dark",
        value: "dark",
        icon: <DarkModeRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
];
const reduceMotionOptions = [
    {
        label: "System",
        value: "system",
        icon: <PersonalVideoRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
    {
        label: "Always Off",
        value: "off",
        icon: <MotionPhotosAutoRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
    {
        label: "Minimize Motion",
        value: "on",
        icon: <MotionPhotosOffRounded sx={{ fontSize: OPTION_ICON_SIZE }}/>,
    },
];
export default function AppearanceTab() {
    const { user, setUser } = useContext(UserContext);
    const [darkModeValue, setDarkModeValue] = useState(user.darkmode);
    const [reduceMotionValue, setReduceMotionValue] = useState(user.settings.reduceMotion);
    const systemTheme = useSystemTheme();
    // Sync when changes apply remotely (e.g. P2P updates)
    useEffect(() => {
        setDarkModeValue(user.darkmode);
    }, [user.darkmode]);
    const handleThemeChange = (event) => {
        const selected = event.target.value;
        setUser((prev) => ({
            ...prev,
            theme: selected,
        }));
    };
    return (<>
      {/* ------------ Dark Mode Section ------------ */}
      <SectionHeading>Dark Mode</SectionHeading>
      <SectionDescription>
        Choose how the app adapts to light and dark environments.
      </SectionDescription>

      <CustomRadioGroup options={darkModeOptions} value={darkModeValue} onChange={(val) => {
            setDarkModeValue(val);
            setUser((prev) => ({
                ...prev,
                darkmode: val,
            }));
        }}/>

      {/* ------------ Theme Section ------------ */}
      <SectionHeading>Color Theme</SectionHeading>
      <SectionDescription>
        Select a color palette or follow your system’s theme.
      </SectionDescription>

      <StyledSelect value={user.theme} onChange={handleThemeChange} IconComponent={ExpandMoreRounded}>
        <StyledMenuItem value="system">
          <PersonalVideoRounded />
          &nbsp; System ({systemTheme === "dark" ? Themes[0].name : Themes[1].name})
        </StyledMenuItem>

        {Themes.map((theme) => (<StyledMenuItem key={theme.name} value={theme.name}>
            <ColorElement tabIndex={-1} clr={theme.MuiTheme.palette.primary.main} secondClr={theme.MuiTheme.palette.secondary.main} size="24px" disableHover aria-label={`Theme: ${theme.name}`}/>
            &nbsp; {theme.name}
          </StyledMenuItem>))}
      </StyledSelect>

      {/* ------------ Motion Section ------------ */}
      <SectionHeading>Motion Preferences</SectionHeading>
      <SectionDescription>
        Control animations—reduce movement for accessibility or smoother battery usage.
      </SectionDescription>

      <CustomRadioGroup options={reduceMotionOptions} value={reduceMotionValue} onChange={(val) => {
            setReduceMotionValue(val);
            setUser((prev) => ({
                ...prev,
                settings: {
                    ...prev.settings,
                    reduceMotion: val,
                },
            }));
        }}/>

      {/* ------------ Glow Effect Toggle ------------ */}
      <CustomSwitch settingKey="enableGlow" header="Glow Effects" text="Add a subtle glow around tasks for a more vibrant interface."/>
    </>);
}
