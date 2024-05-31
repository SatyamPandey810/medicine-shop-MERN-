const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    userLogin: {
        url: `${backendDomain}/api/login`,
        method: "post"
    }
}
export default SummaryApi