const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=81081f051cdc40c88d1dd7e9e816f5e0"

//Exportamos las noticias de manera asincrona

export async function getNews() {
    let result = await fetch(url).then(response => response).then(response => response.json())
    console.log('====================================');
    console.log('nuevas noticias'+url);
    console.log('====================================');
    return result.articles
}