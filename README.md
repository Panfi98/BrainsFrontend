### Job kid Frontend

The client-side interface for **JobKit**, a job-finding and CV/cover letter preparation platform.  
Built with **React** and **Vite**.

BrainsFrontend is a Single Page Application (SPA) frontend connected to [another repository] https://github.com/Panfi98/Brains.git), providing job seekers with tools to search for jobs, manage applications, and create professional CVs and cover letters.
It communicates with the JobKit backend to handle authentication, data fetching, and user interactions.

Currently, the project is not fully completed. At this stage, you can only create a CV using one template, but it has great potential for future development.

## Installing / Getting started

Install dependencies:

```bash
   git clone https://github.com/Panfi98/BrainsFrontend.git
   cd BrainsFrontend
```

Install dependencies:

    npm install
    # or
    yarn install


Configure environment variables:
Create .env

Start development server:

    npm run dev

The app will be available at: http://localhost:5173

Build for production:

    npm run build

Usage

Run the app locally and log in with valid credentials

Navigate between pages to search jobs, build CVs, or manage applications

Token-based login is implemented but still a work in progress

### Initial Configuration

Environment variables in .env:

VITE_API_URL → backend API endpoint

## Developing

Built with React 18, Vite, and ESLint

Authentication returns a token, stored client-side

ESLint configuration ensures code quality and consistenc

## Features

Fast and lightweight thanks to Vite + React  
- Authentication with token-based login (in progress)  
- CV and cover letter creation interface  
- Job search and application management  
- Responsive UI with modern styling 

## Contributing

Fork the repo

Create a new branch (git checkout -b feature/your-feature)

Make your changes

Commit (git commit -m "Add feature")

Push to branch (git push origin feature/your-feature)

Open a Pull Request

## Authors

Developed by Panfi98, Crunch25 and ShapovalYehor
