export let url = process.env.NODE_ENV === "production" ? 
`http://${process.env.DOMAIN_ENV}/api`
:
"http://localhost:3001/api"
