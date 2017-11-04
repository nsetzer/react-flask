


let env = {}

env.baseUrl = ""

// NODE_ENV is either "development" or "production"
if (process.env.NODE_ENV === "development") {
    env.baseUrl = "http://localhost:4200"
}

export default env;