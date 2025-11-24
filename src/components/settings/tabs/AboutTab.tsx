import { Box, Divider, FormGroup, FormLabel, Link, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import banner from "../../../assets/baner.webp";
import { Inventory2Rounded } from "@mui/icons-material";
import { systemInfo } from "../../../utils";

export default function AboutTab() {
  const [storageUsage, setStorageUsage] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const { usage } = await navigator.storage.estimate();
        setStorageUsage(usage);
      } catch (e) {
        console.warn("Could not read storage usage:", e);
      }
    })();
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      {/* App description */}
      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
        This Todo App is built with <strong>React.js</strong> and <strong>MUI</strong>, designed to
        be fast, minimal and easy to use.  
        It includes features like task sharing, theme customization, offline support (PWA),
        and private peer-to-peer syncing.
      </Typography>

      {/* Banner */}
      <Box
        component="img"
        src={banner}
        alt="Todo App Preview"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
          boxShadow: 1,
          mb: 2,
        }}
      />

      {/* Footer / app credits */}
      <Typography variant="caption" sx={{ display: "block", opacity: 0.8, lineHeight: 1.6 }}>
        Designed & developed as part of a learning project.  
        Need the source code? Check out the repository:{" "}
        <Link
          href="https://github.com/your-profile/your-todo-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </Link>
      </Typography>

      {/* Storage usage */}
      {storageUsage !== undefined && storageUsage !== 0 && (
        <>
          <Divider sx={{ my: 2 }} />

          <FormGroup>
            <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Inventory2Rounded sx={{ fontSize: 18 }} />
              Storage Used
            </FormLabel>

            <Box sx={{ mt: 0.5, fontSize: "0.875rem" }}>
              {(storageUsage / 1024 / 1024).toFixed(2)} MB
              {systemInfo.os === "iOS" && " / 50 MB (iOS Limit)"}
            </Box>
          </FormGroup>
        </>
      )}
    </Paper>
  );
}
