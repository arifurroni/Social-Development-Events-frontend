# TogetherWe

## Together, We Can Make a Difference

**Community · Kindness · Change**

TogetherWe is a community-driven social development events platform. It helps people discover local initiatives, organize community service events, and connect with others who want to make a positive difference.

The frontend is built with Next.js. Event data and event-management endpoints are provided by a separate Express.js and MongoDB backend.

## Features

- Homepage with a community-focused hero, recent events, platform features, event photo gallery, volunteer testimonials, and cause-alert signup.
- Upcoming events list with event categories, dates, locations, organizer details, and links to event pages.
- Event detail pages with event information and organizer contact.
- Event creation form with event categories, future-date validation, and image presets.
- Email and password authentication powered by Better Auth.
- Responsive layouts and reusable shadcn/ui components.

Some areas, including the dashboard, profile, and volunteer pages, are still under development. The homepage cause-alert form is a visual placeholder and does not persist subscriptions.

## Tech Stack

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (`base-nova` style, built on Base UI)
- Lucide icons

### Authentication

- Better Auth
- MongoDB adapter
- JWT plugin

### Backend

- Express.js
- MongoDB
- JavaScript

## Getting Started

### Prerequisites

- Node.js and npm
- The TogetherWe Express.js API running at `http://localhost:8000`
- A MongoDB connection for Better Auth

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Create a `.env.local` file in the project root. Add your own values; do not commit credentials.

```env
MONGODB_URI=<your-mongodb-connection-string>
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

`MONGODB_URI` is used by the Better Auth MongoDB adapter. `NEXT_PUBLIC_BETTER_AUTH_URL` configures the browser auth client.

The events API base URL is currently set to `http://localhost:8000` in the frontend. Run the backend at that address or update the API calls when using another environment.

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and community event sections |
| `/upcoming-events` | Browse upcoming community events |
| `/upcoming-events/[id]` | View event details and contact its organizer |
| `/add-event` | Create a community event |
| `/login` | Sign in |
| `/signup` | Create an account |
| `/dashboard` | Dashboard placeholder; in development |
| `/profile` | Profile page |
| `/volunteer` | Volunteer page placeholder; in development |
| `/api/auth/[...all]` | Better Auth API handler |

## Events API

The frontend expects the separate Express.js service on port `8000` to provide:

| Method | Endpoint | Used for |
| --- | --- | --- |
| `GET` | `/recent-upcoming-events` | Homepage event preview |
| `GET` | `/upcoming-events` | Upcoming events list |
| `GET` | `/event/:id` | Event details |
| `POST` | `/add-event` | Create an event |

Event creation and event-detail requests use the Better Auth JWT where required by the backend. The “Join event” action opens an email to the event organizer; direct volunteer registration is not currently connected.

## Available Commands

```bash
npm run dev        # Start the Next.js development server
npm run build      # Create a production build
npm run start      # Start the production server
npm run lint       # Run ESLint
npx tsc --noEmit   # Run the TypeScript type check
```

There is currently no automated test runner configured in this project.

## Project Structure

```text
src/
  app/                 Next.js routes and layouts
  components/
    events/            Event cards
    home/              Homepage sections
    shared/            Shared navigation and footer
    ui/                shadcn/ui components
  hooks/               Shared React hooks
  lib/                 Authentication, event data, and utilities
public/
  images/              Brand and community event images
```

## Design Direction

- Primary: `#166534`
- Accent: `#16A36A`
- Background: `#F0FDF4`
- Text: `#172B24`
- Typography: Josefin_Sans

## Author

**Md. Arifur Rahman**
