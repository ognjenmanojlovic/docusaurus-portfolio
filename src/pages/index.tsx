import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import Header from '@site/src/components/header';
import Hero from '@site/src/components/hero';
import MySkills from '@site/src/components/my-skills';
import ProjectHighlights from '@site/src/components/project-highlights';
import Contact from '@site/src/components/contact';
import Footer from '@site/src/components/footer';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link rel="preload" as="image" href="/img/Manojlovic_Picture.png" />
        <link rel="preload" as="image" href="/img/projects/screenshots/aws-security-lab/aws-security-lab.png" />
        <link rel="preload" as="image" href="/img/projects/screenshots/terraform-ansible/terraform-ansible-logo.png" />
        <link rel="preload" as="image" href="/img/projects/screenshots/fastapi-devsecops/FastAPI-DevSecOps-Platform.png" />
        <link rel="preload" as="image" href="/img/projects/screenshots/fastapi-kubernetes/FastAPI-Kubernetes-Platform.png" />
        <link rel="preload" as="image" href="/img/projects/screenshots/soc-lab/SOC-SIEM-Lab.png" />
        <link rel="preload" as="image" href="/img/projects/conduit.png" />
        <link rel="preload" as="image" href="/img/projects/babytools.png" />
        <link rel="preload" as="image" href="/img/projects/juiceshop.png" />
        <link rel="preload" as="image" href="/img/projects/password-cracking.png" />
      </Head>

      <Header />
      <Hero />
      <MySkills />
      <ProjectHighlights />
      <Contact />
      <Footer />
    </Layout>
  );
}