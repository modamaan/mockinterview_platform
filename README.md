<img width="1918" height="931" alt="Screenshot 2026-06-07 052703" src="https://github.com/user-attachments/assets/2f99dae2-eafa-4e9f-880f-f36cbd8e8695" />
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

https://github.com/user-attachments/assets/45752464-be07-49e9-aee1-9d68910e8f36


## Screenshots
*(You can add more screenshots of the UI here)*
<img width="1901" height="874" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/39ced7a0-22a4-4329-93a5-0d9991dba2c9" />

<img width="1918" height="931" alt="Screenshot 2026-06-07 052703" src="https://github.com/user-attachments/assets/b0cc16d9-5846-495e-bea4-10c02d1e3b98" />

<img width="1918" height="913" alt="Screenshot 2026-06-07 052731" src="https://github.com/user-attachments/assets/4425bcc1-47b5-4e07-bf61-3ba59cb48b31" />

## How to Run Locally

```bash
git clone https://github.com/modamaan/Ai-mock-Interview.git
cd ai-mock-interview
npm install
npm run dev
```

> **Note:** You will need to set up your `.env.local` file with your Clerk API keys, Neon Database URL, and your `OPENAI_API_KEY` before running the application.

Create a `.env.local` file in the root of the project and add the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon Database URL
DRIZZLE_DB_URL=postgresql://user:password@host/dbname?sslmode=require

# OpenAI API Key
OPENAI_API_KEY=sk-...

# Important information banner text
NEXT_PUBLIC_INFORMATION="Please ensure you are in a quiet room and your webcam is enabled."
NEXT_PUBLIC_QUESTION_NOTE="Click on 'Record Answer' when you want to answer the question. You can review your transcription before submitting."
```
