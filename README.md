<!-- <p align="center">
<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/public/logo192.png" width="128px" />
</p> -->

# 📝React.js Taskflow app

<p align="center"><i>A fast and modern Taskflow app built with React, featuring task sharing via link, P2P Task Sync with WebRTC, theme customization, offline usage as a PWA, and caching for smooth performance.</i></p>

<!-- <p align="center">
<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/iPhone%20Mockup%20black.png" width="400px" />
</p> -->

## 💻 Tech Stack

<ul style="display: flex; flex-direction: column; gap:10px;">
  <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=react" alt="react" width="24" style="vertical-align: middle; margin-right: 4px;" /> React
  </li>
    <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=typescript" alt="typescript" width="20" style="vertical-align: middle;margin-right: 4px;" /> Typescript
  </li>
    <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=vite" alt="vite" width="24" style="vertical-align: middle;margin-right: 4px;" /> Vite
  </li>
  <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=vitest" alt="vitest" width="24" style="vertical-align: middle;margin-right: 4px;" /> Vitest
  </li>
  <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=emotion" alt="emotion" width="24" style="vertical-align: middle;margin-right: 4px;" /> Emotion
  </li>
    <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=mui" alt="mui" width="24" style="vertical-align: middle;margin-right: 4px;" /> Material UI (MUI)
  </li>
</ul>

## ⚡ Features

### 🤖 AI Emoji Suggestions

This feature uses Chrome’s experimental `window.LanguageModel` API powered by **Gemini Nano** — an on-device LLM.

⚠️ Requires **Chrome Canary 128+** with the **Gemini Nano model installed** - [Setup guide](https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/view?pli=1&tab=t.0#heading=h.witohboigk0o)

Code: [src/components/EmojiPicker.tsx](https://github.com/venkatreddy111/Taskflow/blob/main/src/components/EmojiPicker.tsx#L116)

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/emoji-ai.gif" alt="AI Emoji" width="360px" style="border-radius:12px" />

### 🔄 P2P Task Sync with WebRTC

Securely sync all the data between devices using peer-to-peer WebRTC connections. Devices pair via QR code, and your data is transferred directly between them — only minimal server involvement for connection setup, with no data stored or processed in the cloud.

- Tasks and categories are auto-merged based on recent edits or deletions
- For settings and other data, you choose which device to sync from

<video src="https://github-production-user-asset-6210df.s3.amazonaws.com/85953204/459582059-1f2fd620-a64e-42e2-be4f-f17e07fba9a2.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250626%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250626T185723Z&X-Amz-Expires=300&X-Amz-Signature=514e1513d883fab2b5b895d9075d0e0a522497e600e2577d1d11a341ab95aa6f&X-Amz-SignedHeaders=host" controls></video>

### 🎨 Color Themes & Dark Mode

Choose from various color themes and toggle between light and dark modes to suit your preferences.

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/settings.png" width="500px" />

### 🗣️ Task Reading Aloud

Option to have tasks read aloud using the native `SpeechSynthesis` API, with a selection of voices to choose from.

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/ReadAloud.png" width="260px" alt="Task Reading Aloud" />

### 📥 Import/Export Tasks

Users can import and export tasks to/from JSON files. This feature allows users to back up their tasks or transfer them to other devices easily. [Example Import File](https://github.com/venkatreddy111/Taskflow/blob/main/example-import.json)

### 📴 Progressive Web App (PWA)

This app is a Progressive Web App (PWA), which means it can be installed on your device, **used even when you're offline** and behave like a native app with shortcuts and app badges.

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/pwaTaskBar.png" alt="taskbar" width="260px" />

### 🔄 Update Prompt

The app features a custom update prompt that notifies users when a new version is available, allowing for easy refresh to access the latest improvements.

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/UpdatePrompt.png" alt="update prompt" width="260px" />

### 📱 Custom Splash Screens

The app automatically generates custom splash screens from a single HTML template for various iOS and iPadOS devices in both light and dark modes. These splash screens provide a smooth, native-like launch experience when the app is opened as a PWA.

To generate splash screens:

```bash
npm run generate-splash
```

Code: [scripts/splash-screens](https://github.com/venkatreddy111/Taskflow/blob/main/scripts/splash-screens)

## 👨‍💻 Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Venkatreddy111/Taskflow.git
```

2. Navigate to the project directory:

```bash
cd Taskflow
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The app will now be running at [http://localhost:5173/](http://localhost:5173/).

> [!TIP]
> For mobile device testing, use `npm run dev:host` to preview the app on your local network with HTTPS (required for camera features) and a QR code in the terminal for quick access. To enable PWA features in development, see `vite.config.ts`.

## 📷 Screenshots

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/ss3.png" width="300px" />

<!-- <img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/ss4.png" width="300px" />

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/ss5.png" width="300px" />

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/ss6.png" width="300px" /> -->

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/sspc1.png" width="650px" />

## 🚀 Performance

<img src="https://raw.githubusercontent.com/maciekt07/TodoApp/main/screenshots/performance.png" width="600px" />

## Credits

Made with ❤️ by [Venkatreddy111](https://github.com/Venkatreddy111), licensed under [MIT](https://github.com/Venkatreddy111/Taskflow/blob/main/LICENSE).
