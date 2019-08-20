import React from "react";
const GIPHY_LOADING_URL = "http://www.ifmo.ru/images/loader.gif";
const styles = {
    minHeight: "310px",
    margin: "0.5em"
};

class Gif extends React.Component {
    getUrl() {
        return this.props.sourceUrl || GIPHY_LOADING_URL;
    }

    render() {
        let url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
        return (
            <div style={styles}>
                <a href={this.getUrl()} title="view this on Giphy" target="new">
                    <img src={url} alt="sorry" style={{width: "100%", maxWidth: "350px"}}/>
                </a>
            </div>
        )
    }
}

export default Gif;
