# srk-webtodmx
**This is still in very active creation and is not suitable for any kind of general use yet!**

Tool for crowd sourcing DMX lighting control.

# What's this?
This project aims to make (real life-)events that use some kind of (static, ambient) lighting more interactive by crowd sourcing the light control. Users can open up a website containing a simple color picker and choose their preferred color. The color of the lighting will be chosen via some pseudo-democratic averaging of all chosen colors.

# Getting started
This project consists of two main parts communicating with each other:
 - webserver: a website that includes a web app with which visitors can pick a color using a color picker which are then send to the dmxserver.
 - dmxserver: a server that listens for incoming signals from the webserver, creates an average of the sent colors and then pushes them to the light fixtures via OLA (USB -> DMX).

# Installation
- 1. Install Python
- 2. Install the Open Lighting Architecture (OLA): https://www.openlighting.org/ola/getting-started/downloads/
- 3. Patch your lights to universe 1 in OLA
- 4. Clone this repository to your local machinel

# Running
On the device connected to the light fixture:
- 1. Start Open Lighting: `olad -l 3` (or look it up [here](https://www.openlighting.org/ola/getting-started/using-ola/#How_to_start_olad))
- 2. Start the DMX server: `python dmxserver/dmxserver.py`

On the device running the web server:
- 1. Start the web server: `python webserver/webserver.py`




# TODO
### For v0.1.1
##### Web-Server
 - [ ] UI
 - [ ] Support for multiple lights
##### DMX-Server
 - [ ] Accept DMX object templates

### For v0.1:
##### Web-Server:
 - [x] Color Picker
 - [x] Send color to DMX server via TCP
##### DMX-Server:
 - [x] TCP-Listen
 - [x] Send incoming data to the lighting via DMX
###### Testing:
 - [x] Test over network
 - [x] Test with real life DMX lights
 ##### Refactoring
 - [x] Make the project's structure better
