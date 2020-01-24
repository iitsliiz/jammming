import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(){
        if(this.state.term !== ''){
            this.props.onSearch(this.state.searchTerm);
        }
    }

    handleTermChange(e) {
        console.log(this.state.searchTerm);
		this.setState({ searchTerm : e.target.value });
	
      }

    render(){
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} value={this.props.term} />
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;