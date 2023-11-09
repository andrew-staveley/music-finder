/* 
Submit Handler:
    Takes in a search query via the search bar, sends a request to Apple's iTunes API, and
    recieves a response with information about relevant songs to then append them to the DOM.
    As this is the initial part of the website, it also adds some of the event listeners used in
    this program.
*/
let submitHandler = function(event) {
    let searchBar = document.getElementById('searchBar')
    event.preventDefault();
    let element = document.getElementById("artistCollection");
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    };
    let searchQuery = encodeURI(document.querySelector('#searchBar').value);
    fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=song&limit=16`)
        .then((response) => response.json())
        .then((data) => {
            let counter = 1;
            //console.log(data)
            data.results.forEach((value) => {
                let artistCollection = document.querySelector('#artistCollection');
                let newSongCard = document.createElement('div');
                newSongCard.className = `songCard`;
                newSongCard.id = `songCard${counter}`;
                //newSongCard.addEventListener("mouseover", (handleMouseover))

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

                //Add Button
                let addDiv = document.createElement('div');
                addDiv.className = 'addButton';
                addDiv.id = `addButton${counter}`;
                let addButton = document.createElement('button');
                addButton.addEventListener("click", (buttonHandler))
                addButton.innerText = 'Add This Song!';
                addDiv.appendChild(addButton);
                newSongCard.appendChild(addDiv);

                //Preview URL: Hidden from website
                let preview = document.createElement('audio');
                preview.className = 'previewUrl';
                preview.id = `previewUrl${counter}`;
                preview.src = value.previewUrl;
                newSongCard.appendChild(preview);

                //Card Push
                artistCollection.appendChild(newSongCard);
                
                //Counter: assigns a unique ID to each newly made song card to easily retrieve data.
                counter++
            });
        });
    searchBar.value = '';
};

/*
Button Handler:
    This event is triggered when the user clicks on the add button. This the in turn, will grab the
    associated song name and artist, and then append them onto the playlist. This also includes a remove 
    button to remove songs off playlist.
*/
let buttonHandler = function(event) {
    let x = this.parentNode.id;
    let y = x.slice(-1);
    let songName = document.getElementById(`trackName${y}`).innerText;
    let artistName = document.getElementById(`artistName${y}`).innerText;
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'X';
    removeButton.className = 'removeButton';
    removeButton.addEventListener('click', removeHandler);
    let playlistElement = document.createElement('li');
    playlistElement.className = 'playlistItem';
    playlistElement.innerHTML = `${songName} - ${artistName}`;
    playlistElement.appendChild(removeButton);
    playlistCollection.appendChild(playlistElement);
};

/*
Reset Handler:
    This event is triggered when the reset button is selected. When selected, it deletes all nodes under
    artistCollection. This also removes all the searched songs and clears the list. This does NOT clear
    the contents of the playlist.
*/
let resetHandler = function(event) {
    event.preventDefault();
    let element = document.getElementById("artistCollection");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

/*
Handle Mouseover:
    This event is triggered when a mouseover is detected over a song card. When that happens, it will play a 10
    preview of the song, to help determine the user if that is the correct song.
*/
let handleMouseover = function(event) {
    event.preventDefault();
    let x = this.id.slice(-1);
    let preview = document.getElementById(`previewUrl${x}`);
    preview.play();
    setTimeout(function() {
        preview.pause();
    }, 10000);
};

/*
Remove Handler:
    This function aims to remove a selected playlsit item.
*/
let removeHandler = function(event) {
    event.preventDefault()
    this.parentNode.remove()
};

/*
Preview Handlers:
    This function toggles mouseover song previews.
*/
let previewHandlerOn = function(event) {
    let cards = document.querySelectorAll('.songCard');
    for (let card of cards) {
        card.addEventListener('mouseover', handleMouseover);
    };
    let offButton = document.getElementById('previewOff')
    offButton.className = 'toggleButton'
    let onButton = document.getElementById('previewOn')
    onButton.className = 'hidden'
};
let previewHandlerOff = function(event) {
    let cards = document.querySelectorAll('.songCard');
    for (let card of cards) {
        card.removeEventListener('mouseover', handleMouseover);
    };
    let offButton = document.getElementById('previewOff')
    offButton.className = 'hidden'
    let onButton = document.getElementById('previewOn')
    onButton.className = 'toggleButton'
};

//Event listeners
document.querySelector('#inputForm').addEventListener("submit", (submitHandler));
document.querySelector('#inputForm').addEventListener("reset", (resetHandler));
document.querySelector('#previewOn').addEventListener("click", (previewHandlerOn));
document.querySelector('#previewOff').addEventListener("click", (previewHandlerOff));
