/* 
Submit Handler:
    Takes in a search query via the search bar, sends a request to Apple's iTunes API, and
    recieves a response with information about relevant songs to then append them to the DOM.
*/

let submitHandler = function(event) {
    event.preventDefault()
    let searchQuery = encodeURI(document.querySelector('#searchBar').value)
    fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=song&limit=10`)
        .then((response) => response.json())
        .then((data) => {
            let counter = 1
            //console.log(data)
            for(let value of data.results) {
                let artistCollection = document.querySelector('#artistCollection');
                let newSongCard = document.createElement('div');
                newSongCard.className = `songCard`;
                newSongCard.id = `songCard${counter}`;

                //Album Image
                let albumImageDiv = document.createElement('div');
                let albumImage = document.createElement('img');
                albumImageDiv.className = `albumImage`;
                albumImageDiv.id = `albumImage${counter}`;
                albumImage.src = `${value.artworkUrl100}`;
                albumImage.alt = 'Album Cover';
                albumImageDiv.appendChild(albumImage);
                newSongCard.appendChild(albumImageDiv);

                //Track Name
                let trackNameDiv = document.createElement('div');
                trackNameDiv.className = 'trackName';
                trackNameDiv.id = `trackName${counter}`;
                let trackName = document.createElement('a');
                trackName.href = `${value.collectionViewUrl}`;
                trackName.innerText = `${value.trackName}`;
                trackNameDiv.appendChild(trackName);
                newSongCard.appendChild(trackNameDiv);

                //Album Name
                let albumNameDiv = document.createElement('div');
                albumNameDiv.className = 'albumName';
                albumNameDiv.id = `albumName${counter}`;
                let albumName = document.createElement('a');
                albumName.href = `${value.collectionViewUrl}`;
                albumName.innerText = `${value.collectionName}`;
                albumNameDiv.appendChild(albumName);
                newSongCard.appendChild(albumNameDiv);

                //Artist Name
                let artistNameDiv = document.createElement('div');
                artistNameDiv.className = 'artistName';
                artistNameDiv.id = `artistName${counter}`;
                let artistName = document.createElement('a');
                artistName.href = `${value.artistViewUrl}`;
                artistName.innerText = `${value.artistName}`;
                artistNameDiv.appendChild(artistName);
                newSongCard.appendChild(artistNameDiv);

                //Track Genre
                let trackGenreDiv = document.createElement('div');
                trackGenreDiv.className = 'trackGenre';
                trackGenreDiv.id = `trackGenre${counter}`;
                let trackGenre = document.createElement('small');
                trackGenre.innerText = `${value.primaryGenreName}`;
                trackGenreDiv.appendChild(trackGenre);
                newSongCard.appendChild(trackGenreDiv);
                
                //Release Year
                let releaseYearDiv = document.createElement('div');
                releaseYearDiv.className = 'releaseYear';
                releaseYearDiv.id = `releaseYear${counter}`;
                let releaseYear = document.createElement('small');
                let releaseYearRefined = value.releaseDate.slice(0, 4);
                releaseYear.innerText = releaseYearRefined;
                releaseYearDiv.appendChild(releaseYear);
                newSongCard.appendChild(releaseYearDiv);

                //Favorite Button
                let favoriteDiv = document.createElement('div');
                favoriteDiv.className = 'favoriteButton';
                favoriteDiv.id = `favoriteButton${counter}`;
                let favoriteButton = document.createElement('button');
                favoriteButton.addEventListener("click", (buttonHandler))
                favoriteButton.innerText = 'Favorite This Song!';
                favoriteDiv.appendChild(favoriteButton);
                newSongCard.appendChild(favoriteDiv);

                //Card Push
                artistCollection.appendChild(newSongCard);
                
                //Counter
                counter++
            };
        });
};


let buttonHandler = function(event) {
    let x = this.parentNode.id
    let y = x.slice(-1)
    let songName = document.querySelector(`trackName${y}`)
    let artistName = document.querySelector(`artistName${y}`)
    console.log(songName, artistName)
}

let resetHandler = function(event) {
    event.preventDefault();
    let element = document.getElementById("artistCollection");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
//Event listeners
document.querySelector('#inputForm').addEventListener("submit", (submitHandler));
document.querySelector('#inputForm').addEventListener("reset", (resetHandler));
