export const load = async ({ fetch }) => {
    const response = await fetch(`/api/archive`)
    const posts = await response.json()

    return {
        posts
    }
}