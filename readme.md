# Kyle Huang — Portfolio

Custom Jekyll portfolio with a light engineering-notebook design. No JavaScript framework or frontend build step is required.

## Local preview

Install Ruby and Bundler, then run:

```powershell
bundle install
bundle exec jekyll serve --watch
```

Open `http://localhost:4000`. Production build:

```powershell
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build
```

## Editing

- `_data/projects.yml`: project descriptions, repository/demo links, and optional screenshots. Blank links are not rendered; blank images use a text-based system overview.
- `index.html`: intro, bio, experience, and contact.
- `_config.yml`: site URL, email, and social profiles.
- `assets/css/main.css`: colors, typography, and responsive layout.
- `PORTFOLIO_TODO.md`: owner checklist for screenshots, links, verification, and deployment. Not published.

Edit source files, not generated `_site/` output. Deploy through GitHub Pages/Jekyll. Confirm the hosting account and production URL using the checklist before publishing.
