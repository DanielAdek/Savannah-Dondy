# 🧠 AI Assistant Frontend for Software Development Company

This project is a modern frontend application built with **React** and **TypeScript**. It serves as an interactive AI assistant for a software development company, offering engaging user experiences on a polished landing page.

The assistant allows users to chat in real time, get guidance, and learn about available services or talent through a conversational interface.

## 📦 Tech Stack

- **React** (Functional Components + Hooks)
- **TypeScript** (strict typing)
- **Material UI** (Specify styling method)
- **Axios** for API communication

---

## 📁 Project Structure
```bash
src/
├── components/
│ ├── ChatBox.tsx
│ ├── ChatHistory.tsx
│ ├── ChatWidget.tsx
│ ├── ClientsSection.tsx
│ ├── Footer.tsx
│ ├── HeroSection.tsx
│ ├── MessageBubble.tsx
│ ├── Navbar.tsx
│ └── TalentsSection.tsx
│
├── pages/
│ └── LandingPage.tsx
│
├── services/
│ └── api.ts
│
├── App.tsx
└── index.tsx
```

## 🧩 Components Overview

### 💬 `ChatBox`
Encapsulates the AI assistant's message input and display area. Manages conversation flow, input state, and triggers API calls.

### 📜 `ChatHistory`
Displays a scrollable log of all past chat interactions between the user and the assistant.

### 🔘 `ChatWidget`
Acts as a floating or embedded toggle to open/close the AI assistant. Integrates `ChatBox` and `ChatHistory`.

### 👥 `ClientsSection`
Highlights trusted clients or partners with logos/testimonials to build trust with users.

### 🚀 `HeroSection`
The top section of the landing page showcasing the company’s value proposition, call to action (CTA), and introductory content.

### 🧠 `MessageBubble`
Renders individual messages in the chat history, supporting different alignments or message types (user/AI).

### 🔝 `Navbar`
Responsive navigation bar containing links to different parts of the page or external resources.

### 👨‍💻 `TalentsSection`
Highlights featured engineers or team members, showcasing their skills or profiles.

### 🦶 `Footer`
Contains legal links, contact info, social media, and other secondary links.

---

## 📄 Pages

### 🏠 `LandingPage`
The main marketing page that integrates all UI components and serves as the user’s entry point. It embeds the AI assistant via the `ChatWidget`.

---

## 🔌 Services

### `api.ts`
Handles all API calls between the frontend and the backend or AI service. Typically includes:

- `sendMessage(message: string): Promise<ChatResponse>`
- `fetchChatHistory(): Promise<ChatMessage[]>`

Uses `axios` or `fetch` to communicate with backend services or AI inference engines.

---

## ⚙️ Getting Started

### 📥 Installation

```bash
$ git clone https://github.com/DanielAdek/Savannah-Dondy/ai-sales-rep-app.git
$ cd ai-sales-rep-app
$ yarn install
$ yarn start
```