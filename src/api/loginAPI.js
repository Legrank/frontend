export async function getLogin() {
    const url = `/test` 
    const response= await fetch(url)
    const commits = await response.json()
    console.log(commits)
    return commits
}