const ip = "18.229.137.129";
export let url = process.env.NODE_ENV === "productionASD" ? 
`http://${ip}/api`
:
"http://localhost:3001/api"



