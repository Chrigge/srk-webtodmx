import socket
import array

from ola.ClientWrapper import ClientWrapper

TCPIP = "0.0.0.0";
TCPPORT = 5005;
TCPBUFFERSIZE = 1024;

tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
tcpSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
tcpSocket.bind ((TCPIP, TCPPORT))
tcpSocket.listen (1);

def DMXSend (inputData):
    universe = 1;
    data = array.array ('B');
    for i in inputData:
        data.append (i);
    
    global dmxWrapper
    dmxWrapper = ClientWrapper();
    dmxClient = dmxWrapper.Client();
    
    dmxClient.SendDmx (universe, data, DMXSent);
    dmxWrapper.Run();


def DMXSent (status):
    if (status.Succeeded()):
            print ("DMX data sent");
    else:
        print ("DMX error! ", status.message);
    global dmxWrapper
    if dmxWrapper:
        dmxWrapper.Stop();


def AcceptConnections():
    tcpConn, tcpAddr = tcpSocket.accept();
    print 'Connection adress: ', tcpAddr
    while (1):
        data = tcpConn.recv (TCPBUFFERSIZE);
        if (not data): break;
        color = HexToArray(data);
        print 'Received data: ', data
        print ('Equals color: ', color[0], '; ', color[1], '; ', color[2])
        tcpConn.send (data);
        DMXSend (color);
    tcpConn.close();

def HexToArray (color):
    """ Convert a hexadecimal rgb color saved as a String
        to an array with size 3"""
    
    # If the first char is #, cut it out
    if (color[0] == '#'):
        color = color[1:]
    # Convert the hexadecimal bytes to decimal
    r = int (color[0:2], 16);
    g = int (color[2:4], 16);
    b = int (color[4:7], 16);
    return [r,g,b]


while 1:
    AcceptConnections();
