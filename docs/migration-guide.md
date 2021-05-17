# Migration guide

For migration, you have to move your old content to the new project.

## Move Articles

| Form old project         | To new project       |
| ------------------------ | -------------------- |
| `src/pages/article/*.md` | `src/pages/article/` |

> **For all articles you have to change those things in markdown:**
> - Rename `articleImage` field to `image` in markdown frontmatter
> - Add `cardTitle` field with it's value in markdown frontmatter
> - Add `description` field with the SEO description in markdown frontmatter
> - Also you have to change every afiliate link `<a class="buy-button" rel="nofollow noreferrer noopener" target="_blank" data-href="link-1">Buy Now</a>` to `@data-link="link-1"` in markdown body
> - You have to change every `<data-chart value="50" />` to `@data-chart="50"` in markdown body

## Move Tags

| Form old project     | To new project   |
| -------------------- | ---------------- |
| `src/data/tags/*.md` | `src/data/tags/` |

## Move Affiliate Links

| Form old project                | To new project              |
| ------------------------------- | --------------------------- |
| `src/data/affiliate-links/*.md` | `src/data/affiliate-links/` |

> For all affiliate links you have to add `buttonText` field with its value

## Move Images

| Form old project | To new project |
| ---------------- | -------------- |
| `static/img/*`   | `static/img/`  |

## Move index.md

| Form old project     | To new project |
| -------------------- | -------------- |
| `src/pages/index.md` | `src/pages/`   |

## Move Others

| Form old project | To new project |
| ---------------- | -------------- |
| `src/data/*.md`  | `src/data/`    |

> In this case in `src/data/footer.md` you can remove `column4` since I have removed that section

**It's possible that I've missed some stuff in this guide**
