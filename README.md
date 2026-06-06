# AI-Powered Mock Interview Platform

<img width="1901" height="874" alt="Screenshot 2026-02-08 153126" src="https://github.com/user-attachments/assets/39ced7a0-22a4-4329-93a5-0d9991dba2c9" />

## Overview
An advanced, interactive mock interview application built with Next.js that helps job seekers practice their interviewing skills using real-time AI generation and video/emotion analysis.

## Problem Statement
Job seekers often lack access to professional mock interviews to practice and receive constructive, unbiased feedback before the real thing. Furthermore, candidates often struggle to assess their own non-verbal cues (like confidence, facial expressions, and eye contact) which play a massive role in actual interviews.

## Solution
This platform provides an end-to-end simulated interview environment. It generates tailored technical questions based on the user's exact tech stack and experience level, records their video/audio answers, runs real-time client-side emotion detection, transcribes their speech, and provides detailed AI-driven feedback and ratings on their answers.

## Features
- **Tailored AI Interviews:** Dynamically generated questions based on the desired job role, description, and years of experience.
- **Real-time Emotion & Face Detection:** Client-side emotion detection using `face-api.js` that tracks your dominant emotion, confidence level, and alerts you if you look away from the camera.
- **Live Transcription (Whisper):** Speech-to-text integration using OpenAI Whisper to automatically and accurately capture your spoken answers.
- **Detailed AI Feedback:** Receive a rating out of 10, an ideal answer comparison, and actionable feedback for every single question.
- **Interview Analytics Dashboard:** Get an overall interview grade, track your dominant mood/confidence, and review past performances.
- **Previous Year Questions (PYQs):** Access a repository of standard interview questions with properly formatted code-block solutions.

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/ui, react-webcam
- **Backend:** Next.js API Routes, Clerk (Authentication)
- **Database:** PostgreSQL (Neon Serverless), Drizzle ORM
- **APIs:** OpenAI API (GPT-4o-mini for generation, Whisper for transcription)
- **Hosting:** Vercel (Recommended)

## Codex / OpenAI Usage
Throughout the development of this project, AI tools (such as ChatGPT, GitHub Copilot, and agentic coding assistants) were heavily utilized to accelerate the build process:
- **Ideation:** Brainstorming the core features, such as adding client-side emotion detection to stand out from other mock interview platforms.
- **Architecture Planning:** Designing the database schema with Drizzle ORM and structuring the Next.js App Router layout for optimal performance.
- **Code Generation:** Rapidly scaffolding React components, building the modern UI with Tailwind CSS and shadcn/ui, and implementing complex features like real-time webcam recording and audio transcription.
- **Debugging:** Troubleshooting and fixing issues with the `face-api.js` integration, resolving Next.js hydration and layout errors, and fixing database seeding scripts.
- **Documentation:** Automatically generating and formatting this README and structuring the Previous Year Questions (PYQs) data formatting.
- **API Integration:** Seamlessly integrating the OpenAI API (`gpt-4o-mini`) for prompt engineering and Clerk for secure user authentication.

## Demo
[Add your demo or pitch video link here]

## Screenshots
*(You can add more screenshots of the UI here)*
<img width="1901" height="874" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/39ced7a0-22a4-4329-93a5-0d9991dba2c9" />

## How to Run Locally

```bash
git clone https://github.com/modamaan/Ai-mock-Interview.git
cd ai-mock-interview
npm install
npm run dev
```

> **Note:** You will need to set up your `.env.local` file with your Clerk API keys, Neon Database URL, and your `OPENAI_API_KEY` before running the application.
