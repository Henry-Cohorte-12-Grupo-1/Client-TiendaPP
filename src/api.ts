export const url =
    process.env.NODE_ENV === "production"
        ? `http://tiendapp.servebeer.com/api`
        : "http://localhost:3001/api";
