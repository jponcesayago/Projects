export const getGifts = async (category) => {

    const apiKey = 'OEb5hKWM15Qn5l1PjErHfnqS3bYyGfIW';
    const limit = '10';

    const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + category + '&limit=' + limit;
    const resp = await fetch(url)
    const { data } = await resp.json();
    //

    const gifs = data.map(item => {
        return {
            id: item.id,
            title: item.title,
            url: item.images?.downsized_medium.url
        }
    });

    console.log(gifs);

    return gifs;

}
