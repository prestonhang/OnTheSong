
//Initializers to grab certain contexts in HTML
var audio = document.querySelector('#audio');
var songName = document.querySelector('#SongName');
var artistName = document.querySelector('#ArtistName');
var albumName = document.querySelector('#AlbumName');
var songImage = document.querySelector('#image');
var playPauseButton = document.querySelector('.play-pause-button');
var volume = document.querySelector('.volume');
var searchInput = document.querySelector('.search-input');
var file = document.querySelector("#returned-song");

//List of song objects
var songs = [
    {   name: "Die For You",
        artist: "Joji",
        album: "SMITHEREENS",
        image: "https://i.scdn.co/image/ab67616d0000b273eaac2a7955f5b8967991cacb",
        audio: "./songfiles/dieforyou.mp3"
    },
    
    {   name: "16",
        artist: "Baby Keem",
        album: "The Melodic Blue",
        image: "https://i.scdn.co/image/ab67616d0000b2731bfa23b13d0504fb90c37b39",
        audio: "./songfiles/16.mp3"
    },
    {
        name: "Come Inside Of My Heart",
        artist: "IV Of Spades",
        album: "CLAPCLAPCLAP!",
        image: "https://images.genius.com/557f8fdce6d1864ba1d40ac8943dfba2.1000x1000x1.jpg",
        audio: "./songfiles/comeinsideofmyheart.mp3"
    },
    {
        name: "Just Wanna Rock",
        artist: "Lil Uzi Vert",
        album: "Just Wanna Rock",
        image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Lil_Uzi_Vert_-_Just_Wanna_Rock.png",
        audio: "./songfiles/justwannarock.mp3"
    },
    {
        name: "20 Min",
        artist: "Lil Uzi Vert",
        album: "Luv Is Rage 2 (Deluxe)",
        image: "https://i1.sndcdn.com/artworks-heJqyRrgUoou-0-t500x500.jpg",
        audio: "./songfiles/20min.mp3"
    },
    {
        name: "thom",
        artist: "Joji",
        album: "Chloe Burbank: Volume I",
        image: "https://images.genius.com/d975db9da0481850c3e8134af1d9dc87.300x300x1.jpg",
        audio: "./songfiles/thom.mp3"
    },
    {
        name: "fantasize",
        artist: "ericdoa",
        album: "fantasize",
        image: "https://images.genius.com/5d136c55081721d5c37fdcf13a183b48.1000x1000x1.png",
        audio: "./songfiles/fantasize.mp3"
    },
    {
        name: "Heaven Sent",
        artist: "Tevomxntana",
        album: "Heaven Sent",
        image: "https://s.mxmcdn.net/images-storage/albums2/4/6/5/0/3/8/51830564_800_800.jpg",
        audio: "./songfiles/heavensent.mp3"
    }
]

/**********************************************
 * playOrPause()
 * Used to switch the audio on or off
 **********************************************/
function playOrPause(){
    if(ifPlaying == false){
        audio.play();
        ifPlaying = true;
    }
    else{
        
        audio.pause();
        ifPlaying = false;
    }
}

/**********************************************
 * updateSong()
 * Input: song
 * Set all current values and contexts to the 
 * input
 **********************************************/
function updateSong(song){
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    albumName.textContent = song.album;
    songImage.src = song.image;
    audio.src = song.audio;
}


/**********************************************
 * nextSong()
 * Used to increase the index and update the 
 * song
 **********************************************/
function nextSong(){
    if(currentIndex == (totalSongs - 1)){
        currentIndex = 0;
    }
    else{
        currentIndex++;
    }
    currentSong = songs[currentIndex];
    
    updateSong(currentSong);
    audio.play();
    ifPlaying = true;
}


/**********************************************
 * prevSong()
 * Used to decrease the index and update the song
 **********************************************/
function prevSong(){
    if(currentIndex == 0){
        currentIndex = (totalSongs-1);
    }
    else{
        currentIndex--;
    }
    currentSong = songs[currentIndex];
    
    updateSong(currentSong);
    audio.play();
    ifPlaying = true;
}


/**********************************************
 * changeVolume()
 * Changes the volume of the song
 **********************************************/
function changeVolume(){
    var volumeValue = document.querySelector('.volume').value;
    audio.volume = (volumeValue/100);
}

/**********************************************
 * getSongRec()
 * Used to intialize request to microservice
 * Fetches result of Flask backend to get song
 * recommendation
 **********************************************/
function getSongRec(){
    //Open Flask URL
    const api_url = "http://127.0.0.1:5000/";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        //If state is done and HTTP OK gotten
        if(this.readyState == 4 && this.status == 200) {   
            document.getElementById("rec-text").textContent = (this.responseText);
        }
    };
    xhttp.open("GET", api_url, true);
    xhttp.send()
}

/**********************************************
 * changeToSearchedSong()
 * Inputs: song     - song entered to be played
 *         index    - index of the song
 **********************************************/
function changeToSearchedSong(song, index){
    currentTrack = song;
    currentIndex = index;
    updateSong(currentTrack);
    audio.play();
}


function checkInputFromSearch(userString, count, warning){
    for(let i = 0; i < totalSongs; i++){
        //Compare each attribute of each song
        let checkUserInputName = songs[i].name.includes(userString)
        let checkUserInputArtist = songs[i].artist.includes(userString);
        let checkUserInputAlbum = songs[i].album.includes(userString);
        if(checkUserInputName == true || checkUserInputArtist == true || checkUserInputAlbum == true){
            //If the current track fits the user input, continue further
            if(currentTrack == songs[i]){
                continue;
            }
            else{
                warning.style.display = 'none';
                changeToSearchedSong(songs[i], i);
                break;
            }
        }
        else{
            count++;
        }
        if(count == 2){
            warning.style.display = 'block';
        }
    }
}

/**********************************************
 * Main event loop
 * Initializes startup
 **********************************************/
let totalSongs = 8;
let ifPlaying = false;
let currentTrack = songs[0];
let currentIndex = 0;
var count = 0;
updateSong(currentTrack);




/**********************************************
 * EVENT LISTENERS
 **********************************************/

//On volume bar change
volume.addEventListener('input', function(){
    changeVolume();
})


//On search input change
searchInput.addEventListener('input', function(){
    var userString = document.querySelector('.search-input').value;
})

//On search enter 
searchInput.addEventListener('keypress', function(event){
    //If user input an Enter key
    if(event.key === "Enter"){
        var userString = document.querySelector('.search-input').value;
        var warning = document.querySelector('#too-many-enters');
        checkInputFromSearch(userString, count, warning);
    }
})
