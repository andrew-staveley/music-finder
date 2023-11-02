/* 
Submit Handler:
    Takes in a search query via the search bar, sends a request to Apple's iTunes API, and
    recieves a response with information about relevant songs to then append them to the website.
*/

let submitHandler = function(event) {
    event.preventDefault()
    let searchQuery = encodeURI(document.querySelector('#searchBar').value)
    fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=song&limit=10`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            for(let value of data.results) {
                let artistCollection = document.querySelector('#artistCollection');
                let newSongCard = document.createElement('div');
                newSongCard.className = 'songCard';

                //Album Image
                let albumImageDiv = document.createElement('div');
                let albumImage = document.createElement('img');
                albumImageDiv.className = 'albumImage'
                albumImage.src = `${value.artworkUrl100}`;
                albumImage.alt = 'Album Cover';
                albumImageDiv.appendChild(albumImage);
                newSongCard.appendChild(albumImageDiv);

                //Track Name
                let trackNameDiv = document.createElement('div');
                trackNameDiv.className = 'trackName';
                let trackName = document.createElement('a');
                trackName.href = `${value.collectionViewUrl}`;
                trackName.innerText = `${value.trackName}`;
                trackNameDiv.appendChild(trackName);
                newSongCard.appendChild(trackNameDiv);

                //Album Name
                let albumNameDiv = document.createElement('div');
                albumNameDiv.className = 'albumName'
                let albumName = document.createElement('a');
                albumName.href = `${value.collectionViewUrl}`;
                albumName.innerText = `${value.collectionName}`;
                albumNameDiv.appendChild(albumName);
                newSongCard.appendChild(albumNameDiv);

                //Artist Name
                let artistNameDiv = document.createElement('div');
                artistNameDiv.className = 'artistName';
                let artistName = document.createElement('a');
                artistName.href = `${value.artistViewUrl}`;
                artistName.innerText = `${value.artistName}`;
                artistNameDiv.appendChild(artistName);
                newSongCard.appendChild(artistNameDiv);

                //Track Genre
                let trackGenreDiv = document.createElement('div');
                trackGenreDiv.className = 'trackGenre';
                let trackGenre = document.createElement('small');
                trackGenre.innerText = `${value.primaryGenreName}`;
                trackGenreDiv.appendChild(trackGenre);
                newSongCard.appendChild(trackGenreDiv);
                
                //Release Year
                let releaseYearDiv = document.createElement('div');
                releaseYearDiv.className = 'releaseYear';
                let releaseYear = document.createElement('small');
                let releaseYearRefined = value.releaseDate.slice(0, 4);
                releaseYear.innerText = releaseYearRefined;
                releaseYearDiv.appendChild(releaseYear);
                newSongCard.appendChild(releaseYearDiv);

                //Card Push
                artistCollection.appendChild(newSongCard);
            };
        });
};

document.querySelector('#inputForm').addEventListener("submit", (submitHandler));