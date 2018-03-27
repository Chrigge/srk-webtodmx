""" webserver/main.py
    main file of the web server that hosts the color picker
    and sends picked colors to the dmx server. """

""" Imports """
import sys
import pickle

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
        data = {'deviceID':request.form['deviceID'],
                'colorValues':request.form['colorValues'] };
        
        echo = TCPSend (pickle.dumps (data));
        print ("Sent data, Server response:"
                ,pickle.loads(echo));
    return ""



""" Main """

if (__name__ == '__main__'):
    flask.run (host = '0.0.0.0', port = 5000);
