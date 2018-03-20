""" Imports """
import sys

sys.path.append ('../modules') ## Append the module directory
from helper import HexToArray
from tcphelper import TCPIP, TCPPORT, TCPBUFFERSIZE
from tcphelper import TCPListen, AcceptConnections
from dmxhelper import DMXSend, DMXSent

""" Inits """
tcpSocket = TCPListen();


""" Functions """
def SendColor (data):
    color = HexToArray(data);
    print ('Sent color: ', color[0], '; ', color[1], '; ', color[2])
    DMXSend (color);
        
""" Main """
if (__name__ == '__main__'):
    while 1:
        AcceptConnections(tcpSocket, SendColor);
