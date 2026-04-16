# Dental Q&A App

A React application for dental questions and answers with individual question pages.

## Features

- Submit questions about dental issues with optional photos
- Search questions by keyword
- View questions in a list with links to individual pages
- Doctors can provide answers on individual question pages (doctor mode toggle)
- Simple UI for Q&A

## Getting Started

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open http://localhost:5175 in your browser

## Usage

- Submit questions with optional photos on the home page
- Use the search bar to filter questions by keyword
- Click "詳細を見る" to view individual questions
- Toggle to "医者モード" to access answering features on question detail pages
- Doctors can answer questions on the detail page

## Docker

Build the Docker image:

```bash
docker build -t q-a-expert-questions .
```

Run the container:

```bash
docker run -p 8080:80 q-a-expert-questions
```

Alternatively with Docker Compose:

```bash
docker compose up --build
```

