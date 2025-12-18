import styled from "@emotion/styled";
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { getFontColor } from "../../utils";
import { useEffect, useState } from "react";
import { SyncAltRounded } from "@mui/icons-material";
import { css } from "@emotion/react";
const CustomRadioGroup = ({ options, value, disabledOptions = [], onChange, }) => {
    const [focusedValue, setFocusedValue] = useState(null);
    const [keyboardFocus, setKeyboardFocus] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Tab" || e.key.startsWith("Arrow")) {
                setKeyboardFocus(true);
            }
        };
        const handleMouseDown = () => {
            setKeyboardFocus(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);
    return (<>
      <StyledRadioGroup value={value} onChange={(e) => onChange(e.target.value)} // no TS error
    >
        {options.map((option) => {
            const isDisabled = disabledOptions.includes(option.value);
            const isSelected = value === option.value;
            const isFocused = focusedValue === option.value;
            return (<FormControlLabel key={option.value} value={option.value} disabled={isDisabled} sx={{ position: "relative", margin: 0, padding: 0 }} control={<StyledRadioControl onFocus={() => setFocusedValue(option.value)} onBlur={() => setFocusedValue(null)}/>} label={<StyledLabelBox selected={isSelected} disabled={isDisabled} focused={isFocused && keyboardFocus} sx={{ border: "1px solid", borderColor: "divider" }}>
                  <IconWrapper>{option.icon}</IconWrapper>
                  <StyledLabel translate="no" variant="body2">
                    {option.label}
                  </StyledLabel>
                </StyledLabelBox>}/>);
        })}
      </StyledRadioGroup>

      {focusedValue && keyboardFocus && (<FocusHint>
          <SyncAltRounded /> Navigate with arrow keys
        </FocusHint>)}
    </>);
};
export default CustomRadioGroup;
/* -------------------------------------------------------------------------- */
/*                                  STYLES                                    */
/* -------------------------------------------------------------------------- */
const StyledRadioGroup = styled(RadioGroup) `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin: 12px 6px 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 12px;
    margin: 12px 0 0;
  }
`;
const StyledRadioControl = styled(Radio) `
  opacity: 0;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  z-index: 1;
`;
const StyledLabelBox = styled(Box) `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;
  border-radius: 12px;
  user-select: none;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  color: ${({ theme, selected }) => selected && getFontColor(theme.primary)};
  background-color: ${({ theme, selected }) => (selected ? theme.primary : "transparent")};

  transition: background-color 0.25s ease;

  ${({ disabled, theme, selected }) => !disabled &&
    css `
      &:hover {
        background-color: ${selected ? theme.primary : "rgba(0, 0, 0, 0.08)"};
      }
    `}

  ${({ focused, theme }) => focused &&
    css `
      outline: 3px solid ${theme.primary};
      outline-offset: 3px;
      box-shadow: 0 0 8px ${theme.primary}80;
    `}

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;
const IconWrapper = styled.div `
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;
const StyledLabel = styled(Typography) `
  font-weight: 500;
  text-align: center;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FocusHint = styled.div `
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  opacity: 0.8;
  font-size: 14px;
`;
