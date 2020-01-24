import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {
        searchResults: [{
            track:{id: 0, name: '', artist: '', album: ''}
          }],
        playlistName: '',
        playlistTracks: [{
          name:'', 
          artist: '', 
          album: ''
        }]
      }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track){
      if(this.state.playlistTracks.find(savedTrack =>{
        return (savedTrack.id === track.id);
      })){return;
      }else {
        let tracks = this.state.playlistTracks;
        tracks.push(track);
      this.setState({ playlistTracks: tracks});
    }
  }

  removeTrack(track){
    console.log(track);
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(item => {
      return (item.id !== track.id);
    });
    this.setState({playlist: tracks});
    }
      

     updatePlaylistName(newPlaylistName){
      this.setState({
          playlistName: newPlaylistName
      })
     }

     savePlaylist(){
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist().then(() =>{
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [trackURIs]
        })
      })
    }

     search(searchTerm){
       Spotify.search(searchTerm).then(tracks  =>{
         this.setState({
           searchResults: tracks
         })
       })
      console.log(searchTerm);
     }

     

    render(){
      return (
        <div>
           <h1>Ja<span className="highlight">mmm</span>ing</h1>
           < div className="App">
           <SearchBar
          term={this.state.searchTerm}
          onTermChange={this.setSearchTerm}
          onSearch={this.search}
          onClear={this.onClearSearch}
        />
           <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.state.addTrack}/>
           <Playlist  onSave={this.state.savePlaylist} onNameChange={this.state.updatePlaylistName} onRemove={this.state.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.playlistTracks}/>
          
        </div>
    </div>
    </div>
  );
  }
}

export default App;
