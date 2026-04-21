# Docusaurus Portfolio

This repository hosts my personal portfolio website built with Docusaurus.

The project is structured into multiple sections such as **Header**, **Hero**, **My Skills**, **My Project Highlights**, **Contact**, and **Footer**. Each section is implemented as a separate React component inside `src/components` and combined into a single page layout in `src/pages/index.tsx`.

Global project configuration such as site metadata, navigation, deployment settings, and base URL handling is managed in `docusaurus.config.ts`. In addition, the repository contains GitHub Actions workflows inside `.github/workflows` to automate the build and deployment process.

The goal of this project is to build and deploy a static website that serves as a professional portfolio. It is used to present my background, technical skills, and practical project work in the areas of **Cyber Security**, **DevSecOps**, **Docker**, **Linux**, **CI/CD**, and secure deployments.

A static Docusaurus build provides fast performance, easy maintenance, simple hosting via GitHub Pages, and a reliable deployment workflow that helps ensure consistent results across different environments.

## About Me

My name is **Ognjen Manojlovic** and I am an aspiring **Cyber Security Engineer** with a strong interest in **DevSecOps**, **Linux**, **Docker**, **CI/CD pipelines**, and secure infrastructure.

My background includes IT administration, networking, security fundamentals, and hands-on server and deployment work. I enjoy building practical solutions, improving system security, and documenting technical projects in a clear and structured way.

## Table of Contents

- [About Me](#about-me)
- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [How to Start](#how-to-start)
- [Build Process](#build-process)
- [Usage](#usage)
  - [1. Site Configuration (`docusaurus.config.ts`)](#1-site-configuration-docusaurusconfigts)
  - [2. Sections and Content](#2-sections-and-content)
  - [3. Styling](#3-styling)
  - [4. Assets and Links](#4-assets-and-links)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Live Website](#live-website)

## Prerequisites

Before starting the project locally, make sure the following tools are installed on your system:

- Node.js >= 18
- npm or yarn

## Quickstart

To install all required dependencies, run the following command in the project root directory:

```bash
npm install
```

## How to Start

### 1. Clone the repository

Download the repository to your local machine:

```bash
git clone https://github.com/ognjenmanojlovic/docusaurus-portfolio.git
```

### 2. Move into the project folder

Change into the repository directory:

```bash
cd docusaurus-portfolio
```

### 3. Install dependencies

Install all required Node.js packages:

```bash
npm install
```

### 4. Start the development server

Run the local development server:

```bash
npm run start
```

### 5. Open the project in your browser

After the server starts, open the following address in your browser:

```text
http://localhost:3000
```

The development server supports hot reload, which means that changes in the source code are reflected automatically while the server is running.

## Build Process

Building the project generates an optimized static production version of the website.

To create a production build locally, run the following command from the root directory:

```bash
npm run build
```

After the build process is completed, the generated static files are stored inside the following directory:

```text
build/
```

These files can then be deployed to GitHub Pages, served with NGINX, or hosted on another static web hosting platform.

## Usage

This section explains how the project can be configured and extended to achieve different results.

### 1. Site Configuration (`docusaurus.config.ts`)

The main global configuration is handled inside the following file:

```text
docusaurus.config.ts
```

Important configuration options include:

#### `url`

Defines the main production URL of the website.

Example:

```ts
url: 'https://ognjenmanojlovic.com'
```

#### `baseUrl`

Defines the base path under which the site is served.

- If a custom domain is used, `/` is usually correct.
- If GitHub Pages is used under a repository subpath, this may need to be something like `/docusaurus-portfolio/`.

Example:

```ts
baseUrl: '/'
```

#### `organizationName`

Defines the GitHub username or organization name.

Example:

```ts
organizationName: 'ognjenmanojlovic'
```

#### `projectName`

Defines the name of the GitHub repository.

Example:

```ts
projectName: 'docusaurus-portfolio'
```

#### `title`

Defines the website title shown in the browser and metadata.

#### `tagline`

Defines a short subtitle or description for the website.

#### `favicon`

Defines the path to the browser tab icon.

This configuration file is the correct place to update global branding, metadata, navigation, footer links, deployment settings, and domain-related values.

### 2. Sections and Content

The homepage is built from multiple reusable React components.

These components are stored inside the following directory:

```text
src/components/
```

Typical section folders may include:

```text
src/components/header/
```

```text
src/components/hero/
```

```text
src/components/my-skills/
```

```text
src/components/my-project-highlights/
```

```text
src/components/contact/
```

```text
src/components/footer/
```

Each component should be stored in its own folder, and the main component file should be named:

```text
index.tsx
```

The sections are imported and combined inside the following file:

```text
src/pages/index.tsx
```

This file controls the structure and order of the homepage.

To modify existing content, edit the TSX code inside the relevant component folder.

To add a new section, follow these steps:

#### Step 1. Create a new component folder

```text
src/components/<new-section>/
```

#### Step 2. Create the component file

```text
src/components/<new-section>/index.tsx
```

#### Step 3. Optionally add a CSS Module

```text
src/components/<new-section>/<new-section>.module.css
```

#### Step 4. Import the component into the homepage

Import it in:

```text
src/pages/index.tsx
```

#### Step 5. Place the component in the desired order

Arrange it in the JSX layout where you want it to appear on the page.

This structure keeps the project modular, clean, and easy to maintain.

### 3. Styling

Component styling is implemented using **CSS Modules**.

Examples:

```text
hero.module.css
```

```text
footer.module.css
```

```text
contact.module.css
```

CSS Modules help keep styles scoped to the matching component and reduce the risk of style conflicts across the project.

When creating a new component, its styling should follow the same pattern:

#### Create a dedicated CSS Module file

```text
<component-name>.module.css
```

#### Import it into the component

Example:

```tsx
import styles from './hero.module.css';
```

#### Use the style classes inside the JSX

This keeps the styling clean, readable, and maintainable.

### 4. Assets and Links

Static files such as images, icons, and other media files should be placed inside:

```text
static/
```

For images, a common location is:

```text
static/img/
```

Assets can then be referenced with paths such as:

```text
/img/profile.png
```

```text
/img/projects/project-preview.png
```

When using GitHub Pages with a repository subpath, make sure that asset paths and links work correctly with the configured `baseUrl`.

For internal navigation, relative links should be preferred whenever possible because they usually work both in local development and in production.

## Deployment (GitHub Pages)

The project can be deployed automatically with **GitHub Pages** using **GitHub Actions**.

Deployment is triggered when changes are pushed to the default branch.

### 1. Open the repository settings on GitHub

Go to your repository on GitHub and open:

```text
Settings
```

### 2. Open the Pages section

Navigate to:

```text
Pages
```

### 3. Select the deployment source

Set the source to:

```text
GitHub Actions
```

### 4. Verify the workflow files

Make sure the deployment workflow exists inside:

```text
.github/workflows/
```

This workflow is responsible for building the Docusaurus project and publishing the generated static files.

### 5. Check important deployment settings

Before pushing changes, verify the following values inside `docusaurus.config.ts`:

- `url`
- `baseUrl`
- `organizationName`
- `projectName`

These settings must match your actual GitHub repository and deployment target.

### 6. Push the latest version

Once everything is configured correctly, push your changes to the default branch:

```bash
git push origin main
```

GitHub Actions will then automatically build and deploy the newest version of the portfolio.

## Live Website

The live portfolio is available at:

```text
https://ognjenmanojlovic.com
```
