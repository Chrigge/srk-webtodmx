""" Contains TCP Helper functions """


""" Imports """
import socket;


""" Constants """
TCPIP = "0.0.0.0";
TCPPORT = 5005;
TCPBUFFERSIZE = 1024;


""" Functions """
def TCPListen():
    """ Opens a TCP socket for listening and returns the opened socket. """
    tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
    tcpSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1);
    tcpSocket.bind ((TCPIP, TCPPORT))
    tcpSocket.listen (1);
    return tcpSocket;


def TCPSend (value):
    """ Sends some value over TCP """
    tcpSocket = TCPConnect()
    tcpSocket.send (value);
    data = tcpSocket.recv (TCPBUFFERSIZE); # Receive the other's echo
    tcpSocket.close ();

    return data;

def TCPConnect ():
    """ Initializes the TCP connection """
    tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
    tcpSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        tcpSocket.connect ((TCPIP, TCPPORT));
    except socket.error:
        tcpSocket.close ();
        print "Error while connecting!"
    return tcpSocket;


def AcceptConnections(tcpSocket, onAccept):
    """ Accepts functions on the given TCP socket, echoes inbound data
        and calls onAccept(data) if there is a successful connection.
        tcpSocket: The listening TCP socket used
        onAccept: Method to be called when a connection is made
        """
    tcpConn, tcpAddr = tcpSocket.accept();
    print ('Incoming connection adress: ', tcpAddr)
    while (1):
        data = tcpConn.recv (TCPBUFFERSIZE);
        if (not data):
            break;   # If there's no more data, stop the loop
        print ('Received data: ', data)
        tcpConn.send (data);    # Echo the data back to the sender
        onAccept (data);        # Execute passed function
    tcpConn.close();            # Close the connection once finished
