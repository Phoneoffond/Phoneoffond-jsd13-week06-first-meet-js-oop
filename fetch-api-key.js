const url = 'https://api.api-ninjas.com/v1/animals?name=';
const apiKey = 'UGFPhwZa6MZMzWwt5RHyBe75J27MCZ7wnHWrWuOe';
const animalName = 'lion';
async function getPost () {
    try {
        const response = await fetch(url+animalName, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const data = await response.json();
        console.log(data[0])
    } catch (error) {
        console.error("Somthing went wrong!", error);
    }
}
getPost();

