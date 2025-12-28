# Content Update Guide

This portfolio website is **content-driven**, meaning all text and data comes from files in the `content/` directory. To update the website, edit these files instead of modifying component code.

## Content Files Overview

### `/content/hero.json`
Contains the hero section content:
- `headline`: Main headline (e.g., "Product-Ops & Systems Operator")
- `subheadline`: Subheadline text
- `description`: Hero description paragraph
- `cta`: Call-to-action buttons (primary and secondary)
- `scrollIndicator`: Scroll indicator text and enable/disable flag

**Example:**
```json
{
  "headline": "Your New Headline",
  "subheadline": "Your Subheadline",
  "description": "Your description text...",
  "cta": {
    "primary": {
      "text": "View Case Studies",
      "href": "#case-studies"
    },
    "secondary": {
      "text": "Get in Touch",
      "href": "#contact"
    }
  },
  "scrollIndicator": {
    "text": "Scroll to explore",
    "enabled": true
  }
}
```

### `/content/metrics.json`
Contains metrics section data:
- `title`: Section title
- `description`: Section description
- `metrics`: Array of metric objects with:
  - `value`: Metric value (e.g., "50%", "$2M+")
  - `label`: Metric label
  - `description`: Short description
  - `icon`: Icon name (rocket, trending-up, users, server)

### `/content/skills.json`
Contains skills and thinking frameworks:
- `title`: Section title
- `description`: Section description
- `categories`: Array of skill categories, each containing:
  - `name`: Category name
  - `skills`: Array of skills with name, level, and description
- `thinking`: Thinking frameworks section with title and frameworks array

**Skill Levels:** `beginner`, `intermediate`, `advanced`, `expert`

### `/content/founders.json`
Contains testimonials and stats:
- `title`: Section title
- `description`: Section description
- `testimonials`: Array of testimonial objects
- `stats`: Stats object with projects, companies, years

### `/content/site-settings.json`
Contains site-wide settings:
- `siteName`: Site name
- `siteDescription`: Site description
- `author`: Your name
- `email`: Contact email
- `social`: Social media links (linkedin, twitter, github)
- `theme`: Theme settings
- `seo`: SEO metadata (title, description, keywords, ogImage)
- `recruiterCTA`: Recruiter CTA settings (enabled, text, description)

### `/content/case-studies/*.mdx`
Case studies written in MDX format. Each file should have frontmatter:

```mdx
---
title: "Case Study Title"
slug: "case-study-slug"
date: "2024-01-15"
category: "Category Name"
thumbnail: "/images/case-studies/thumb.jpg"
excerpt: "Brief excerpt..."
tags: ["Tag 1", "Tag 2"]
---

# Case Study Content

Your MDX content here...
```

## How to Update Content

1. **Edit JSON files directly** - Open any `.json` file in `/content/` and modify the values
2. **Edit MDX files** - Add new case studies by creating new `.mdx` files in `/content/case-studies/`
3. **Update images** - Place images in `/public/images/` and reference them in content files
4. **Restart dev server** - After making changes, restart `npm run dev` to see updates

## Tips

- **Keep JSON valid** - Make sure JSON syntax is correct (commas, quotes, brackets)
- **Use proper MDX frontmatter** - Frontmatter must be valid YAML
- **Update images** - Reference images with paths starting from `/public/` (e.g., `/images/photo.jpg`)
- **Test changes** - Always test in the browser after making content changes
- **Version control** - Commit content changes to track updates over time

## Adding New Case Studies

1. Create a new `.mdx` file in `/content/case-studies/`
2. Add frontmatter with required fields
3. Write your case study content in MDX format
4. The case study will automatically appear in the case studies list (once MDX loading is fully implemented)

## Customization Notes

- All text comes from content files - **never hardcode text in components**
- Colors and styling are controlled via theme variables in `app/globals.css`
- Component structure can be modified in component files, but text should always come from content files
- Social links in `site-settings.json` are optional - remove any you don't use

