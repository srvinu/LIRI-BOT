# LIRI-BOT
## Overview:
### LIRI BOT is a command line nodejs application that can get inputs as argument and respond to the inputs. LIRI is a Language Interpretation and Recognition Interface.
*****************

## Modules Used:
### LIRI BOT uses below npm modules.
```
* DOT ENV
* node-spotify-api
* bandsintown-rest
* AXIOS
* Moment
```
#### NPM Installation/commands:
```
npm init
npm install --save dotenv
npm install --save node-spotify-api
npm install --save bandsintown-rest
npm install --save axios
npm install --save moment
```
*****************

## LIRI Usage:
```
1. node liri.js concert-this <artist/band name here>
2. node liri.js spotify-this-song '<song name here>'
3. node liri.js movie-this '<movie name here>'
4. node liri.js do-what-it-says
```
*****************

## Special Features
```
* Logs are updated/appended on output.log file
* Has default values of user Inputs.
* Error-out if user command doesnt match with LIRI usage.
```
*****************
### Sample Executions:
```
$ node liri.js concert-this "bruno mars"
Name of the Venue: Park Theater
Location: Las Vegas, NV, United States
Date of the Event: 04/29/2019
Log File Updated!

```
-----
```
$ node liri.js spotify-this-song 'happy by Pharrell Williams'
Artist : D*Notice
Song Name : Happy - Karaoke Instrumental Remix Extended Originally Performed By Pharrell Williams
Preview Link : https://p.scdn.co/mp3-preview/35b25b0bcfc72545a78b0866dbaca42c8e4584e2?cid=1272cc7adb18440aa7c709d071bcbb61
Album Name : Happy
Log File Updated!

```
----
```
$ node liri.js movie-this "Avengers"
Title: The Avengers
Released Year : 2012
IMDB Rating: 8.1
Rotten Tomatoes Rating: 92%
Country : USA
Plot of the Movie : Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.
Actors  : Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth
Log File Updated!

```
---
```
$ node liri.js 
ERROR: Invalid input ! Please use below options: 
   node liri.js concert-this <artist/band name here>
   node liri.js spotify-this-song <song name here>
   node liri.js movie-this <movie name here>
   node liri.js do-what-it-says 

```


