import React from 'react';
import Search from "./components/Search";
import Gif from "./components/Gif";

const GIPHY_API_URL = "https://api.giphy.com";
const GIPHY_PUB_KEY = "078ThNCmjQ5M2wN7s7EFpItiu8OOmUS6";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchingText: "",
            gif: {}
        }
    }

    gerGif = searchingText => new Promise(((resolve, reject) => {
        const url = GIPHY_API_URL + "/v1/gifs/random?api_key=" + GIPHY_PUB_KEY + "&tag=" + searchingText;
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {

            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(new Error(this.statusText))
            }
        };
        xhr.onerror = () => {
            reject(new Error(`XMLHttpRequest ERROR: ${this.statusText}`));
        };
        xhr.open("GET", url);
        xhr.send();
    }));

    handleSearch(searchingText) {
        this.setState({loading: true});
        this.gerGif(searchingText)
            .then(response => {
                let data = JSON.parse(response).data;
                let gif = {
                    url: data.images.fixed_width_downsampled.url,
                    sourceUrl: data.url
                };
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                })
            })
            .catch(error => console.log("Something went wrong", error));
    }

    render() {
        return (
            <div>
                <h1>Wyszukiwarka gifów!!!</h1>
                <p>Znajdź gifa na <a href="http://giphy.com">gifhy</a>. Naciskaj ENTER, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch.bind(this)}/>
                <Gif loading={this.state.loading} url={this.state.gif.url} sourceUrl={this.state.gif.sourceUrl}/>
            </div>
        )
    }
}

export default App;
