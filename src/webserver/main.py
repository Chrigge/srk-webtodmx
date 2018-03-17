''' webserver/main.py
    main file of the web server that hosts the color picker
    and sends picked colors to the dmx server. '''

# ------------------------------
# Imports

import socket
from flask import Flask


# ------------------------------
# Constants

# TCP constants
TCPIP = "127.0.0.1"; # The TCP server's IP adress
TCPPORT = 5005;      # The TCP server's port
TCPBUFFERSIZE = 1024;# The TCP server's buffer size (standard: 1024)

# Flask constants
INDEXHTMLPATH = "./../../index.html"; # The file that is loaded when a GET request happens on index


# ------------------------------
# Initializing

# Initialize the TCP socket
tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
tcpSocket.connect ((TCPIP, TCPPORT));

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
        fileContent = get_file ('INDEXHTMLPATH');
        return Response (fileContent, mimetype = "text/html");

    # Listen to incoming POST data (i.e. the colorValue picked from the color picker)
    if (request.method == 'POST'):
        colorValue = request.form.get('colorValue')
        data = TCPSend (colorValue);
        return "<p>Submitted Color: " + colorValue + "<br/>Server response:" + data + '</p>';


# ------------------------------
# Main

if (__name__ == '__main__'):
    flask.run (port = 80);
