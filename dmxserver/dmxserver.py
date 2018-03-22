""" Imports """
import sys
import pickle

sys.path.append ('../modules') ## Append the module directory
from helper import HexToArray
from tcphelper import TCPIP, TCPPORT, TCPBUFFERSIZE
from tcphelper import TCPListen, AcceptConnections
from dmxhelper import DMXSend, DMXSent
from devicehelper import Device
import devicemanager

""" Inits """
tcpSocket = TCPListen();


""" Functions """

"""def SendColor (data):
    color = HexToArray(data);
    print ('Sent color: ', color[0], '; ', color[1], '; ', color[2])
    DMXSend (color);"""

def HandleDMX (receivedData):
    data = pickle.loads (receivedData);
    print ('de-pickled data: ' + data.__str__());
    devicemanager.UpdateDevice (did=data['deviceID'],
                                values=HexToArray(data['colorValues']));
    devicemanager.PrintReservations(values=True);
    DMXSend (devicemanager.GetDMXArray());
        
""" Main """
if (__name__ == '__main__'):
    # Add (debug) rgb light on channel 4
    d1 = Device (name="RGB", address=4, length=3, channels=["r", "g", "b"]);
    d2 = Device (name="RGB", address=8, length=3, channels=["r", "g", "b"]);
    devicemanager.PrintReservations();
    
    while 1:
        AcceptConnections(tcpSocket, HandleDMX);
