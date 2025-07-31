https://cinecraft-backend.onrender.com/

Key Challenges We Faced
Render Deployment Issues

❌ 502 Bad Gateway due to incorrect app.listen() binding

✅ Fixed by using app.listen(PORT, '0.0.0.0')

GraphQL Endpoint Not Responding

❌ Missing root route made Render think the app wasn’t live

✅ Added / and /health routes for proper health checks

Apollo Client Misconfiguration

❌ Hardcoded localhost URI broke frontend in production

✅ Switched to process.env.REACT_APP_GRAPHQL_URI for dynamic endpoint loading

Environment Variable Confusion

❌ Mixed frontend/backend .env usage

✅ Cleaned up .env files and used proper variable naming conventions

Frontend & Backend Sync

❌ Queries not reaching backend due to CORS or URI mismatch

✅ Enabled CORS and verified Apollo Client integration

Render Cold Start Behavior

❌ Backend appeared inactive after idle time

✅ Added /hello and /health routes to keep service warm

Git Script Nesting Error

❌ Nested "scripts" block broke package.json

✅ Refactored scripts for clean concurrent dev setup

Component Import Typos

❌ "cotainers" instead of "containers" caused build errors

✅ Fixed import paths and verified component rendering

GraphQL Playground Access

❌ GraphiQL not showing in production

✅ Enabled conditionally via NODE_ENV !== "production"

Deployment Readiness

✅ Finalized backend logs, frontend URI, and tested live mutations

✅ Final Status
Backend is live and responding at /graphql, /hello, and /health

Frontend is integrated with Apollo Client and ready for deployment

Environment variables are clean and secure

Git repo is structured for professional collaboration
