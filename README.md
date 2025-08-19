# 🎬 Next.js Movie (TMDB Explorer)

A **movie discovery web app** built with **Next.js**, **TypeScript**, **TailwindCSS**, and **TMDB API**.  
Search, browse trending movies, and view detailed information with a clean and responsive UI.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase)](https://www.themoviedb.org/documentation/api)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

- 🔥 Browse trending, popular, and top-rated movies  
- 🔎 Search movies with instant results  
- 🎞️ Detailed movie pages (overview, genres, rating, trailers)  
- 👥 Cast & crew display  
- 🌓 Dark mode support  
- 📱 Responsive design with TailwindCSS  

---

## 🧱 Tech Stack

- **Framework:** Next.js 14 (App Router)  
- **Language:** TypeScript (strict mode)  
- **UI:** TailwindCSS 4  
- **API:** TMDB API  

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/ndlabdev/nextjs-movie.git
cd nextjs-movie
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE=your_tmdb_api_base_url
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_api_token
```

👉 You can get your free API key from [TMDB](https://www.themoviedb.org/settings/api).  

### 4. Run development server

```bash
npm run dev
```

App will be available at: **http://localhost:3000**

---

## ☁️ Deployment

Easiest way: **Vercel** → import repo, set env var `NEXT_PUBLIC_TMDB_API_KEY`.  

---

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the movie API.  
- [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/).  

---

## 📜 License

This project is licensed under the **MIT License**.
