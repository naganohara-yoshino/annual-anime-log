# Annual Anime Log

**Annual Anime Log** is a beautiful, modern web application designed to help anime enthusiasts visualize and share their yearly anime watch history. Built with SvelteKit and integrated with the [Bangumi](https://bgm.tv/) API, it generates stunning, shareable summaries of your anime journey.

## ✨ Features

- **Bangumi Integration**: Seamlessly fetches your watched anime collection directly from your Bangumi account.
- **Yearly Archives**: View your anime history year by year (e.g., `/:username/:year`).
- **Smart Categorization**: Automatically organizes your watched list by:
  - Seasons (Winter, Spring, Summer, Fall)
  - Movies
  - Other formats (OVAs, Specials)

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
- **Runtime**: [Bun](https://bun.sh/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Iconify](https://iconify.design/)
- **API Handling**: `openapi-fetch` for type-safe API requests.

## 🚀 Local Development

To run this project locally, ensure you have **[Bun](https://bun.sh/)** installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/naganohara-yoshino/annual-anime-log.git
   cd annual-anime-log
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Start the development server:**
   ```bash
   bun run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the app.

## 📦 Build

To create a production build of the application:

```bash
bun run build
```

## 📄 License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE) or any later version.

>    Annual Anime Log
>
>    Copyright (C) 2025  Yoshino Naganohara
>
>    This program is free software: you can redistribute it and/or modify
>    it under the terms of the GNU Affero General Public License as
>    published by the Free Software Foundation, either version 3 of the
>    License, or (at your option) any later version.
>
>    This program is distributed in the hope that it will be useful,
>    but WITHOUT ANY WARRANTY; without even the implied warranty of
>    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
>    GNU Affero General Public License for more details.
>
>    You should have received a copy of the GNU Affero General Public License
>    along with this program.  If not, see <https://www.gnu.org/licenses/>.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/naganohara-yoshino">naganohara-yoshino</a>
</p>