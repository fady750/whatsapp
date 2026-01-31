# WhatsApp Web Clone

A full-stack WhatsApp Web–inspired chat application built with Next.js, Supabase, and NextAuth, focusing on real-time messaging, clean UX, and scalable state management.

---

## ✨ Features

- 🔐 Authentication
  - Google OAuth using NextAuth
  - Secure session handling

- 💬 Real-Time Chat
  - Instant message delivery using Supabase Realtime
  - Message status: sent → delivered → read
  - Active conversation updates without refresh

- 📋 Conversations Sidebar
  - Last message preview
  - Real-time ordering and updates
  - Unread state handling

- 👤 Contacts System
  - Add contacts manually
  - Conversations created on first message

- 🖼 Profile Management
  - Update avatar (Supabase Storage)
  - Update profile info
  - Cache-safe avatar updates

- ⚡ Optimized UX
  - Smooth auto-scroll behavior
  - No URL state sharing (WhatsApp Web–style layout)
  - Context-based state isolation to reduce re-renders

---

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Context API

### Backend / Services
- Supabase (PostgreSQL, Realtime, Storage)
- NextAuth (Auth.js v5)

---

## 📦 Dependencies

Key libraries used in this project:

- next
- react
- next-auth
- @supabase/supabase-js
- tailwindcss
- typescript

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/whatsapp-web-clone.git
cd whatsapp-web-clone
