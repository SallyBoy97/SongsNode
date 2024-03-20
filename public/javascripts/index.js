// Array to store song objects
let songArray = [];

// Constructor function for creating Song objects
let SongObject = function(pTitle, pYear, pGenre, pArtist) {
    // this.ID = pID;
    this.ID = Math.random().toString(16).slice(5)
    this.Title = pTitle;
    this.Year = pYear;
    this.Genre = pGenre;
    this.Artist = pArtist;
}

// Adding sample songs to the songArray
// songArray.push(new SongObject(1, "Seek and Destroy", 1982, "Rock", "Metallica"));
// songArray.push(new SongObject(2, "One", 1988, "Rock", "Metallica"));

// Variable to store the selected genre
let selectedGenre = "not selected";

// Event listener to ensure the DOM content is loaded before executing code
document.addEventListener("DOMContentLoaded", function () {

     // Function to create the list of songs
    createList();

    // Event listener for the button to add a new song
    document.getElementById("buttonAdd").addEventListener("click", function () {
        let title = document.getElementById("title").value;
        let year = document.getElementById("year").value;
        let artist = document.getElementById("artist").value;
        // Adding the new song to the songArray
        songArray.push(new SongObject(songArray.length + 1, title, year, selectedGenre, artist));

        // Recreating the list of songs
        createList();
    });


    // Event listener for changes in the genre selection
    document.addEventListener("change", function(event) {
        if (event.target.id === "select-genre") {
            selectedGenre = event.target.value;
        }
    });

// jQuery event listener to populate song details before showing the details page
$(document).on("pagebeforeshow", "#details", function (event) {
    let localID = localStorage.getItem('parm');
    let pointer = GetObjectPointer(localID);

    songArray = JSON.parse(localStorage.getItem('songArray'));

    // Find the song by ID
    let song = songArray.find(song => song.ID == localID);

    // Displaying song details on the details page if the song is found
    if (song) {
        document.getElementById("songTitle").innerHTML = "Song title: " + song.Title;
        document.getElementById("songYear").innerHTML = "Year published: " + song.Year;
        document.getElementById("songGenre").innerHTML = "Genre: " + song.Genre;
        document.getElementById("songArtist").innerHTML = "Artist: " + song.Artist;
    } else {
        // Handle case where the song is not found
        console.log("Song not found");
    }
});
 
function GetObjectPointer(whichID){
    for(i=0;i<songArray.length; i++){
        if(songArray[i].ID = whichID){
            return i;
        }
    }
}

// Function to create the list of songs
function createList() {
    let myUL = document.getElementById("SongListul");
    myUL.innerHTML = "";

        $.get("/getAllSongs",function(data, status){
            songArray = data;


        // Iterating through each song in the songArray to create list items
        songArray.forEach(function (listSong) {
            let myLi = document.createElement('li');
            myLi.classList.add('listSong');
            myLi.setAttribute("data-parm", listSong.ID);
            myLi.innerHTML = listSong.ID + ":  " + listSong.Title + "  " + listSong.Genre; // Include Genre here
            myUL.appendChild(myLi);
        });

        // Adding event listeners to each list item to handle clicks
        let liList = document.getElementsByClassName("listSong");
        Array.from(liList).forEach(function (element) {
            element.addEventListener('click', function () {
                let parm = this.getAttribute("data-parm");
                localStorage.setItem('parm', parm);
                localStorage.setItem('songArray', JSON.stringify(songArray));
                // Redirecting to the details page
                document.location.href = "index.html#details";
            });
        });
    });
}});
