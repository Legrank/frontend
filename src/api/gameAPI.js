export async function getMove(napr) {
    const url = `/move` 
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(napr)
      });
    const move = await response.json()
    return move
}