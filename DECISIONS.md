# Decisions

## technical debt

- **sortable table columns** not yet implemented.
- **pagination** not yet implemented.
- **adaptive table column height** some columns are too long when some of them cut off the content.
- **UX for mobile** components should be adapted to mobile view; not yet implemented.
- **data-test-id** attributes are used to identify UI elements in tests.
- **reduce using strings** move to the contstants file.
- **move/combine repeated logic** some methods are repeated in multiple places.

## Run & test

```bash
npm ci
npm run dev              # http://localhost:5174
npm run check            # test + build (gate)
npm run build:prototype  # production build
```
