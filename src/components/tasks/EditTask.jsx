import styled from "@emotion/styled";
import { CancelRounded, EditCalendarRounded, SaveRounded } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, IconButton, InputAdornment, TextField, Tooltip, } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { ColorPicker, CustomDialogTitle, CustomEmojiPicker } from "..";
import { DESCRIPTION_MAX_LENGTH, TASK_NAME_MAX_LENGTH } from "../../constants";
import { UserContext } from "../../contexts/UserContext";
import { DialogBtn } from "../../styles";
import { formatDate, showToast, timeAgo } from "../../utils";
import { useTheme } from "@emotion/react";
import { ColorPalette } from "../../theme/themeConfig";
import { CategorySelect } from "../CategorySelect";
const DEFAULT_EDIT_TASK_SUBTITLE = "Edit the details of the task.";
export const EditTask = ({ open, task, onClose }) => {
    const { user, setUser } = useContext(UserContext);
    const { settings } = user;
    const [editedTask, setEditedTask] = useState(task);
    const [emoji, setEmoji] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [editLastSaveLabel, setEditLastSaveLabel] = useState(DEFAULT_EDIT_TASK_SUBTITLE);
    const theme = useTheme();
    const nameError = useMemo(() => (editedTask?.name ? editedTask.name.length > TASK_NAME_MAX_LENGTH : undefined), [editedTask?.name]);
    const descriptionError = useMemo(() => editedTask?.description
        ? editedTask.description.length > DESCRIPTION_MAX_LENGTH
        : undefined, [editedTask?.description]);
    useEffect(() => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            emoji: emoji || undefined,
        }));
    }, [emoji]);
    useEffect(() => {
        setEditedTask(task);
        setSelectedCategories(task?.category);
        if (task?.lastSave) {
            setEditLastSaveLabel(`Last edited ${timeAgo(new Date(task.lastSave))} • ${formatDate(new Date(task.lastSave))}`);
        }
        else {
            setEditLastSaveLabel(DEFAULT_EDIT_TASK_SUBTITLE);
        }
    }, [task]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };
    const handleSave = () => {
        document.body.style.overflow = "auto";
        if (editedTask && !nameError && !descriptionError) {
            const updatedTasks = user.tasks.map((task) => {
                if (task.id === editedTask.id) {
                    return {
                        ...task,
                        name: editedTask.name,
                        color: editedTask.color,
                        emoji: editedTask.emoji || undefined,
                        description: editedTask.description || undefined,
                        deadline: editedTask.deadline || undefined,
                        category: editedTask.category || undefined,
                        lastSave: new Date(),
                    };
                }
                return task;
            });
            setUser((prevUser) => ({
                ...prevUser,
                tasks: updatedTasks,
            }));
            onClose();
            showToast(<div>
          Task <b translate="no">{editedTask.name}</b> updated.
        </div>);
        }
    };
    const handleCancel = () => {
        onClose();
        setEditedTask(task);
        setSelectedCategories(task?.category);
    };
    useEffect(() => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            category: selectedCategories || undefined,
        }));
    }, [selectedCategories]);
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (JSON.stringify(editedTask) !== JSON.stringify(task) && open) {
                const message = "You have unsaved changes. Are you sure you want to leave?";
                e.returnValue = message;
                return message;
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [editedTask, open, task]);
    return (<Dialog open={open} onClose={onClose} slotProps={{
            paper: {
                style: {
                    borderRadius: "24px",
                    padding: "12px",
                    maxWidth: "600px",
                },
            },
        }}>
      <CustomDialogTitle title="Edit Task" subTitle={editLastSaveLabel} icon={<EditCalendarRounded />} onClose={onClose}/>

      <DialogContent>
        <CustomEmojiPicker emoji={editedTask?.emoji || undefined} setEmoji={setEmoji} color={editedTask?.color} name={editedTask?.name || ""} type="task"/>

        <StyledInput label="Name" name="name" autoComplete="off" value={editedTask?.name || ""} onChange={handleInputChange} error={nameError || editedTask?.name === ""} helperText={editedTask?.name
            ? editedTask.name.length === 0
                ? "Name is required"
                : editedTask.name.length > TASK_NAME_MAX_LENGTH
                    ? `Name too long (max ${TASK_NAME_MAX_LENGTH})`
                    : `${editedTask.name.length}/${TASK_NAME_MAX_LENGTH}`
            : "Name is required"}/>

        <StyledInput label="Description" name="description" autoComplete="off" value={editedTask?.description || ""} onChange={handleInputChange} multiline rows={4} margin="normal" error={descriptionError} helperText={editedTask?.description
            ? descriptionError
                ? `Description too long (max ${DESCRIPTION_MAX_LENGTH})`
                : `${editedTask.description.length}/${DESCRIPTION_MAX_LENGTH}`
            : undefined}/>

        <StyledInput label="Deadline date" name="deadline" type="datetime-local" value={editedTask?.deadline
            ? new Date(editedTask.deadline)
                .toLocaleString("sv")
                .replace(" ", "T")
                .slice(0, 16)
            : ""} onChange={handleInputChange} slotProps={{
            inputLabel: { shrink: true },
            input: {
                startAdornment: editedTask?.deadline && (<InputAdornment position="start">
                  <Tooltip title="Clear">
                    <IconButton color="error" onClick={() => setEditedTask((prevTask) => ({
                        ...prevTask,
                        deadline: undefined,
                    }))}>
                      <CancelRounded />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>),
            },
        }} sx={{
            colorScheme: theme.darkmode ? "dark" : "light",
            "& .MuiInputBase-root": {
                transition: ".3s",
            },
        }}/>

        {settings.enableCategories && (<CategorySelect fontColor={theme.darkmode
                ? ColorPalette.fontLight
                : ColorPalette.fontDark} selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories}/>)}

        <div style={{ display: "flex", marginTop: 8 }}>
          <ColorPicker width="100%" color={editedTask?.color || "#000000"} fontColor={theme.darkmode
            ? ColorPalette.fontLight
            : ColorPalette.fontDark} onColorChange={(color) => setEditedTask((prevTask) => ({
            ...prevTask,
            color,
        }))}/>
        </div>
      </DialogContent>

      <DialogActions>
        <DialogBtn onClick={handleCancel}>Cancel</DialogBtn>
        <DialogBtn onClick={handleSave} color="primary" disabled={nameError ||
            editedTask?.name === "" ||
            descriptionError ||
            JSON.stringify(editedTask) === JSON.stringify(task)}>
          <SaveRounded /> Save
        </DialogBtn>
      </DialogActions>
    </Dialog>);
};
const UnstyledTextField = (props) => (<TextField fullWidth {...props}/>);
const StyledInput = styled(UnstyledTextField) `
  margin: 14px 0;
  & .MuiInputBase-root {
    border-radius: 16px;
  }
`;
