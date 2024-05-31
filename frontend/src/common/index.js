const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    userLogin: {
        url: `${backendDomain}/api/login`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    }
}
export default SummaryApi