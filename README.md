# Development Notes

## Prisma

When developing and playing around with the schema, you should:

```bash
npx prisma db push
npx prisma generate
```

On migration, run `npx prisma migrate dev --name add-status-column`
