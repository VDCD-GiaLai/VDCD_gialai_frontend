"use client";

import * as React from "react";
import { useRef } from "react";
import { useProjectsGsap } from "@/hooks/use-projects-gsap";
import { ProjectsHeroBanner } from "./projects-hero-banner";
import { ProjectsFeatured } from "./projects-featured";
import { ProjectsGallery } from "./projects-gallery";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";
import { fetchProjectsFromApi } from "@/services/project.service";
import "./projects.css";

/**
 * Client-side container for the Projects page.
 */
export const ProjectsPageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Initialise all GSAP animations scoped to this container */
  useProjectsGsap(containerRef);

  /* ── Data ─────────────────────────────────────────── */
  const [projects, setProjects] = React.useState<ProjectEntry[]>(PROJECTS_DATA);

  React.useEffect(() => {
    fetchProjectsFromApi().then((data) => {
      if (data && data.length > 0) setProjects(data);
    });
  }, []);

  /* ── Filter state ────────────────────────────────── */
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");

  /* ── Derived: unique categories & locations ───────── */
  const categories = React.useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats).sort();
  }, [projects]);

  const locations = React.useMemo(() => {
    const locs = new Set(projects.map((p) => p.location));
    return Array.from(locs).sort();
  }, [projects]);

  /* ── Filtered projects ───────────────────────────── */
  const filteredProjects = React.useMemo(() => {
    let result = [...projects];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedLocation) {
      result = result.filter((p) => p.location === selectedLocation);
    }

    // Sort newest first
    result.sort((a, b) => {
      const yearA = parseInt(a.year, 10) || 0;
      const yearB = parseInt(b.year, 10) || 0;
      return yearB - yearA;
    });

    return result;
  }, [projects, searchQuery, selectedCategory, selectedLocation]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* 1 -- Editorial Hero */}
      <ProjectsHeroBanner />

      {/* 2 -- Featured Projects (1 big card 50% left, 2 cards 50% right) */}
      <ProjectsFeatured projects={projects} />

      {/* 3 -- Gallery */}
      <ProjectsGallery projects={filteredProjects} />
    </div>
  );
};
