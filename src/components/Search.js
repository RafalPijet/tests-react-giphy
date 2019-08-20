import React from "react";

const styles = {
    fontSize: "1.5em",
    width: "90%",
    maxWidth: "350px"
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchingText: ''
        }
    }

    handleSearch(searchingText) {
        const setText = () => new Promise(resolve => resolve(
            this.setState({searchingText: searchingText})
        ));
        setText()
            .then(() => (
                searchingText.length > 2 ? this.props.onSearch(this.state.searchingText) : []
            ));
    }

    handleKeyUp(event) {

        if (event.keyCode === 13 && this.state.searchingText.length > 2) {
            this.props.onSearch(this.state.searchingText);
        }
    }

    render() {
        return <input type="text" onChange={event => this.handleSearch(event.target.value)}
                      onKeyUp={event => this.handleKeyUp(event)}
                      placeholder="Tutaj wpisz wyszukiwaną fraze" style={styles}
                      value={this.state.searchingText}/>
    }
}

export default Search;
