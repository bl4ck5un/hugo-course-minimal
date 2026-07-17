# Repository Guidelines

## Project Structure

This repository is a reusable Hugo theme for course websites. Theme templates live in `layouts/`, shared styling lives in `assets/css/main.css`, and theme metadata lives in `theme.toml`. The example site is under `exampleSite/`; use it for local testing and as the reference implementation. Course data is stored in page bundles such as `exampleSite/content/spring-2026/course.yaml`, with the expected shape documented by `schemas/course.schema.json`.

## Build and Verification

Use Hugo from the repository root. The example site is the primary integration test:

```sh
hugo server --source exampleSite --themesDir ../.. --theme hugo-course-minimal
hugo --source exampleSite --themesDir ../.. --theme hugo-course-minimal --gc --minify
```

Validate the course schema and example data when changing `course.yaml` or `schemas/course.schema.json`:

```sh
uvx check-jsonschema --check-metaschema schemas/course.schema.json
uvx check-jsonschema --schemafile schemas/course.schema.json exampleSite/content/spring-2026/course.yaml
```

## Coding Style

Keep the theme minimal and academic. Prefer Bootstrap 5 classes for layout and components before adding custom CSS. When custom CSS is needed, keep it in `assets/css/main.css`, scope it to theme components, and avoid overriding Bootstrap globally.

Use two-space indentation for YAML and HTML templates. Keep Hugo templates readable with local variables for repeated values. Normalize user-provided asset paths with Hugo helpers so the theme works both at a domain root and under a project path such as `/hugo-course-minimal/`.

## Data Model

Course editions should keep structured course data in `course.yaml` next to the edition `_index.md`. Keep the schema and README examples aligned when adding, renaming, or removing fields. Optional collections such as `information.platforms` and `staff` must render cleanly when empty or null.

Slides are modeled per lecture:

```yaml
slides:
  - file: "lecture-01.pdf"
    cover: "lecture-01.png"
```

Assignments are a flat list under each lecture:

```yaml
assignment:
  - "Lab 1"
  - "Written task 1"
```

## Change Scope

Keep theme changes reusable. Do not hard-code course-specific names, Yale branding, instructor details, domains, or semester-specific data into layouts. Put demo-only content in `exampleSite/`, and put reusable behavior in the theme.

Do not commit generated `public/` output. For layout or styling changes, verify the example site locally before committing.
