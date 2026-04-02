# 📊 Finance Dashboard

A premium, full-stack financial dashboard designed to help users track their income, expenses, and overall financial health. Built with a modern, responsive "sidebar-first" architecture inspired by enterprise fintech applications.

## ✨ Features

- **Dashboard Overview:** Quick glance summary cards displaying Total Balance, Income, and Expenses.
- **Interactive Visualizations:** Beautiful, responsive charts powered by Recharts (including Time-based balance trends and Categorical spending breakdowns).
- **Transaction Management:** A powerful data table to view, sort, and search your transactions.
- **Dynamic Filtering:** Filter dashboard data by date ranges to instantly update charts and summary metrics.
- **Role-Based Access Control:** Secure user authentication with distinct views for Admins and Viewers.
- **Premium UI/UX:** Clean, minimal aesthetics using Tailwind CSS, Shadcn UI, and smooth micro-animations.
- **Responsive Design:** Fully mobile-friendly layout that elegantly adapts across device sizes.

## 🛠️ Tech Stack

**Frontend:**
- [Next.js (App Router)](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Static Typing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Shadcn UI](https://ui.shadcn.com/) - Accessible UI components
- [Zustand](https://github.com/pmndrs/zustand) - Client-side state management
- [TanStack Query & Table](https://tanstack.com/) - Server state and data tables
- [Recharts](https://recharts.org/) - Data visualization

**Backend & Database:**
- [HonoJS](https://hono.dev/) - Edge-optimized API framework
- [Neon Database](https://neon.tech/) - Serverless PostgreSQL
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Clerk](https://clerk.com/) - Authentication and User Management

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/GeethaPranathi/Finance-Dashboard.git
cd Finance-Dashboard
cd finance-dashboard-main
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add your keys (you will need accounts for Clerk and Neon DB):
\`\`\`env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_database_url
\`\`\`

### 4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application!
