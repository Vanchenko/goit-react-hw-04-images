import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
    key: '35244614-3f1384186f27e7cacc119fb8b',
    per_page: 12,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
}

export const loadImagesPixabay = async function(searchQuery, page) {
    const response = await axios.get(`?q=${searchQuery}&page=${page}`);
    return response.data.hits;
}

