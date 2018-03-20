# srk-webtodmx
**This is still in very active creation and is not suitable for any kind of general use yet!**

Tool for crowd sourcing DMX lighting control.

# What's this?
This project aims to make (real life-)events that use some kind of (static, ambient) lighting more interactive by crowd sourcing the light control. Users can open up a website containing a simple color picker and choose their preferred color. The color of the lighting will be chosen via some pseudo-democratic averaging of all chosen colors.

# Getting started
This project consists of two main parts communicating with each other:
 - webserver: a website that includes a web app with which visitors can pick a color using a color picker which are then send to the dmxserver.
 - dmxserver: a server that listens for incoming signals from the webserver, creates an average of the sent colors and then pushes them to the light fixtures via USB -> DMX.

# Installation
- 1. Install Python
- 2. Install the Open Lighting Architecture (OLA): https://www.openlighting.org/ola/getting-started/downloads/
- 3. Clone this repository to your local machine

# Running
On the device connected to the light fixture:
- 1. Start Open Lighting: `olad -l 3` (or look it up [here](https://www.openlighting.org/ola/getting-started/using-ola/#How_to_start_olad))
- 2. Start the DMX server: `python src/dmxserver/main.py`

On the device running the web server:
- 1. Start the web server: `python src/webserver/main.py`


# FAQ
### Does this work?
If you have a rgb light connected via USB->DMX that listens to channels 0, 1, 2 on universe 0, it *might*. But it probably doesn't yet.
### But why?
Making people interact with events in some way that is more than entering it, looking at something and then leaving makes them more engaged and gives them the feeling to be actually part of it instead of just consuming it.
### That's cool, but WHY?
Seriously, we started this because we wanted to program something. The nice justification in the previous question's answer was made up after we started working on it.
### What does srk stand for?
Schwarz-Rot Kollabs. It's a party in the University of Göttingen's student parliament. We do things. 

# TODO
### For v0.1:
##### Web-Server:
 - [ ] Color Picker
 - [x] Send color to DMX server via TCP
 - [ ] Design
##### DMX-Server:
 - [x] TCP-Listen
 - [x] Send incoming data to the lighting via DMX
###### Testing:
 - [ ] Test over network
 - [ ] Test with real life DMX lights
