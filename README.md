# Smartphone Catalog
A responsive React application for browsing a smartphone catalog, viewing product details, and managing a shopping cart.

## Features

- Phone catalog listing
- Search by name or brand
- Product details page
- Color and storage selection
- Dynamic pricing
- Similar products section
- Persistent shopping cart
- Responsive design
- Error handling
- Unit tests

## Tech Stack

- React
- TypeScript
- Webpack
- Tailwind CSS
- React Router
- Context API
- Jest + React Testing Library
- ESLint
- Prettier


## Project Structure

```text
src/
├── assets/
├── components/
├── context/
├── pages/
├── services/
├── types/
├── utils/
└── tests/
```

### Architecture

The application is organized by:

- **Pages**: Route-level views
- **Components**: Reusable UI components
- **Services**: API communication layer
- **Context**: Global cart state management
- **Types**: TypeScript interfaces and types
- **Utils**: Shared helper functions

## Prerequisites

Make sure you have the following installed before running the project:

- Node.js +
- npm 9+


## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.template`.

Start development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```
