""" webserver/main.py
    main file of the web server that hosts the color picker
    and sends picked colors to the dmx server. """

# ------------------------------
# Imports

import socket

from flask import Flask
from flask import request, render_template, url_for


# ------------------------------
# Constants

# TCP constants
TCPIP = "127.0.0.1"; # The TCP server's IP adress
TCPPORT = 5005;      # The TCP server's port
TCPBUFFERSIZE = 1024;# The TCP server's buffer size (standard: 1024)

# Flask constants
# INDEXHTMLPATH = "/index.html"; # The file that is loaded when a GET request happens on index


# ------------------------------
# Initializing

# Initialize and connect the TCP socket
tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
tcpSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
try:
    tcpSocket.connect ((TCPIP, TCPPORT));
except socket.error:
    tcpSocket.close ();
    print "Error while connecting!"

# Initialize the Flask app
flask = Flask (__name__);


# ------------------------------
# TCP functionalities

def TCPSend (value):
    # Send the value to the server via TCP
    tcpSocket.send (value);
    # Get the server's response and close the socket
    data = tcpSocket.recv (TCPBUFFERSIZE);
    tcpSocket.close ();

    return data;


# ------------------------------
# Flask functionalities

@flask.route('/', methods=['GET', 'POST'])
def index():
    # Show the color picker
    if (request.method == 'GET'):
        return render_template ('html/index.html');

    # Listen to incoming POST data (i.e. the colorValue picked from the color picker)
    if (request.method == 'POST'):
        colorValue = request.form.get('colorValue')
        data = TCPSend (colorValue);
        print ("Submitted Color: " + colorValue + "\nServer response:"
                + data);


# ------------------------------
# Main

if (__name__ == '__main__'):
    flask.run (port = 5000);
