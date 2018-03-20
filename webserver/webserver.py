""" webserver/main.py
    main file of the web server that hosts the color picker
    and sends picked colors to the dmx server. """

""" Imports """
import sys

from flask import Flask
from flask import request, render_template, url_for

sys.path.append ('../modules') ## Append the module directory
from tcphelper import TCPIP, TCPPORT, TCPBUFFERSIZE
from tcphelper import TCPConnect, TCPSend


""" Inits """
flask = Flask (__name__);


""" Flask functions """
@flask.route('/', methods=['GET', 'POST'])
def index():
    """ Show the color picker """
    if (request.method == 'GET'):
        return render_template ('html/index.html');

@flask.route('/ajax', methods=['POST'])
def ajax():
    """ Listen to incoming POST data
        (i.e. the colorValue picked from the color picker) """
    if (request.method == 'POST'):
        colorValue = request.form['colorValue']
        data = TCPSend (colorValue);
        print ("Submitted Color: " + colorValue + "\nServer response:"
                + data);
    return ""
    


""" Main """

if (__name__ == '__main__'):
    flask.run (port = 5000);
