

const clientId = " f738812217404e6ebaeebe732ee6fa04";
const authorizationUrl = "https://accounts.spotify.com/authorize"
const apiBaseUrl = 'https://api.spotify.com/v1/';
const uri = 'https://codecademyJamming.surge.sh';
let accessToken;
let requestTime;
let expirationTime;
let userId;


const Spotify = {
    getAccessToken(){
        if(expirationTime && Date.now() > expirationTime){
            requestTime = undefined;
            expirationTime = undefined;
            accessToken = undefined;
            userId = undefined;
            window.location.hash = '';
        }
        if(!accessToken){
            if(window.location.hash.includes('#access_token')){
                accessToken = window.location.href.match(/access_token=([^&]*)/)[2];
                const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[2];
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
            } else {
                requestTime = Date.now();
                window.location.href = `${authorizationUrl}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${uri}`;
            }
        }
        return accessToken;
    },
 
    search(searchTerm){
        const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        return fetch(fetchUrl, {
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(this.handleResponse,
                ).then(
                    (jsonResponse) =>{
                        if(jsonResponse.tracks){
                            return jsonResponse.tracks.map(
                                track => ({
                                    id: track.id,
                                    title: track.name,
                                    artist: track.artists[0].name,
                                    album: track.album.name,                                    
                                    uri: track.uri,
                                }),
                            );
                        }
                        throw new Error('Search results: bad format');
                    }
                )
                
},

savePlaylist(playlistName, trackURIs){
    if(!playlistName || !trackURIs.length){
        return;
    }  
     const accessToken =  Spotify.getAccessToken();
     const headers ={ Authorization: `Bearer ${accessToken}` };
     let userId;

   return fetch(`${apiBaseUrl}/me`, {headers: headers} 
   ).then(response => response.json()
   ).then(jsonResponse =>{
       userId = jsonResponse.id;
       return fetch(`${apiBaseUrl}users/${userId}/playlists`, {
           headers: headers,
           method: 'POST',
           body: JSON.stringify({name:playlistName})
       }).then(response => response.json()
       ).then(jsonResponse =>{
        let playlistId = jsonResponse.id;
        return fetch(`$${apiBaseUrl}users/${userId}/playlists/${playlistId}`,{
            headers: headers,
            method:'POST',
            body: JSON.stringify({URIs: trackURIs})
        })
       })
   })
}

  

}



export default  Spotify;