# Playlist-Builder-5000

This is a project for Flatiron by Andrew Staveley

Powered by Apple Music API
https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1

All music, album art, and names are property of the original artist, each album, song, and artist, are linked within the web application.

Playlist Builder 5000

This project allows for a user to search for a song, and add it too the local playlist within the browser.

When a user searches for a song, the application takes the search query and sends it to the Apple Music API, which will then return an array with 16 objects, one for each song result. These then get added into the search area where the user can decide the exact song thier looking for and add it directly to their playlist. The program also supports mouseover previews on each song. When the previews are turned on, any mouseover will play a 10 second snippit of the song. 