# Hugo Course Minimal

A minimal, responsive Hugo theme for recurring university course websites.
It uses Bootstrap 5 for reusable UI, keeps semester content in page bundles,
and renders schedules from validated YAML data.

[View the example site](https://bl4ck5un.github.io/hugo-course-minimal/)

## Features

- Current-course landing page with optional hero artwork
- Structured meeting, instructor, staff, and schedule data
- Full-row lecture cards with optional slide previews
- References, milestones, notes, and slide links per lecture
- Archive dropdown for older editions
- Native foldable sections for prerequisites, grading, and similar content
- Bootstrap 5 components with very little custom CSS
- JSON Schema for editor assistance and CI validation

## Requirements

- Hugo 0.123.0 or newer
- Hugo Extended is recommended

## Install

Add the theme as a Git submodule:

```sh
git submodule add https://github.com/bl4ck5un/hugo-course-minimal.git themes/hugo-course-minimal
```

Then configure Hugo:

```yaml
theme: hugo-course-minimal

params:
  currentCoursePath: /spring-2026
  courseCode: CPSC 4000
  courseTitle: Applied Security
  institution: Example University
  brandText: Example University
  accentColor: "#214761"
  heroImage: /hero.svg
  customCSS:
    - /css/site.css
  repositoryURL: https://github.com/example/course-site
  footerText: "© Course Staff"
```

`currentCoursePath` identifies the content page bundle rendered on the home
page. That bundle must contain `_index.md` and `course.yaml`.

Use `customCSS` for site-specific branding or overrides. Paths can point to
files in the site `static/` directory, such as `static/css/site.css`, or to
Hugo assets under `assets/`.

## Course edition

Create an edition page:

```text
content/
└── spring-2026/
    ├── _index.md
    ├── course.yaml
    └── slides/
        ├── lecture-01.pdf
        └── lecture-01.png
```

Use `layout: current-course` in `_index.md`. Ordinary Markdown becomes the
course-description section. The `fold` shortcode creates understated
disclosure sections:

```md
{{</* fold title="Prerequisites" */>}}
Background in programming is recommended.
{{</* /fold */>}}
```

## Course data

Copy `schemas/course.schema.json` into your site or reference it from your
edition's `course.yaml`. The core structure is:

```yaml
information:
  meeting:
    days: "Monday and Wednesday"
    time: "11:30am–12:45pm"
  location: "Room 101, Computing Center"
  platforms: []

instructor:
  name: "Alex Morgan"
  title: "Prof."
  url: "https://example.com"
  photo: "/instructor.jpg"

staff: null

schedule:
  sections:
    - title: "Section I: Foundations"
      lectures:
        - number: 1
          date: "Jan 12"
          title: "Course introduction"
          slides:
            - file: "lecture-01.pdf"
              cover: "lecture-01.png"
          reference:
            - label: "Optional reading"
              url: "https://example.com/reading"
          assignment:
            - "Lab 1: Threat modeling"
```

The slide `cover` is optional. If a PDF exists without a preview, the card
shows “Preview not available” and still renders the Slides button.

## Menus and archives

Use Hugo's menu configuration for an Archive dropdown:

```yaml
menus:
  main:
    - name: Archive
      identifier: archive
    - name: Fall 2025
      parent: archive
      pageRef: /fall-2025
```

## Run the example

From the theme repository root:

```sh
hugo server --source exampleSite --themesDir ../.. --theme hugo-course-minimal
```

Production check:

```sh
hugo --source exampleSite --themesDir ../.. --theme hugo-course-minimal --gc --minify
uvx check-jsonschema --check-metaschema schemas/course.schema.json
uvx check-jsonschema --schemafile schemas/course.schema.json exampleSite/content/spring-2026/course.yaml
```

## License

MIT © Fan Zhang
