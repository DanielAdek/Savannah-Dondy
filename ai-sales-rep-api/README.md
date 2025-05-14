# 🧠 AI Assistant Backend – NestJS API

This is the backend service for an **AI Assistant** built for a **Software Development Company**, using the [NestJS](https://nestjs.com/) framework. The assistant handles intelligent conversations with users, qualifies leads, and manages interactions via chat interfaces.

## 📦 Features

### 🧠 AI Module
- Handles integration with AI services (e.g., OpenAI, custom LLMs).
- Manages prompt flows and context switching.
- Supports dynamic data collection (e.g., company size, hiring intent, budget).

### 💬 Chat Module
- Real-time user conversations with WebSocket support.
- Persists chat history per user session.
- Handles different states of interaction (e.g., onboarding, discovery, handoff).

### 🧲 Lead Module
- Stores qualified leads from the AI chat flow.
- Tracks lead metadata: company name, contact email, hiring intent, budget, and timeline.
- Exposes APIs for admin dashboards or CRM integrations.

---

## 🛠 Tech Stack

| Layer            | Technology           |
|------------------|----------------------|
| Backend Framework| [NestJS](https://nestjs.com/) |
| Database         | [MongoDB](https://www.mongodb.com/) |
| ORM              | [Mongoose](https://mongoosejs.com/) |
| AI Integration   | OpenAI API |

---

## 📁 Project Structure

```bash
src/
├── ai/               # AI module: prompt orchestration, service integration
│   ├── ai.module.ts
│   ├── ai.service.spec.ts
│   └── ai.service.ts
├── chat/             # Chat module: conversation handling
│   ├── chat.controller.sped.ts
│   ├── chat.service.ts
│   ├── chat.controller.ts
│   └── chat.module.ts
├── lead/             # Lead module: lead storage and queries
│   ├── lead.module.ts
│   ├── lead.service.ts
│   ├── lead.schema.ts
│   └── lead.service.spec.ts
├── app.module.ts
└── main.ts
```

## Project setup

```bash
$ yarn install
```
`create .env file and add the below`
```bash
PORT=8080
MONGODB_URI=mongodb://localhost:27017/ai-assistant
OPENAI_API_KEY=your-openai-api-key
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

[Sever API endpoint](https://intellibran-api.onrender.com)


## Stay in touch

- Author - [Daniel Adekunle](https://github.com/DanielAdek/Savanna-Dondy)
