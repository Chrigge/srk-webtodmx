import socket


TCPIP = "127.0.0.1";
TCPPORT = 5005;
TCPBUFFERSIZE = 1024;

tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
tcpSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
tcpSocket.bind ((TCPIP, TCPPORT))
tcpSocket.listen (1);


def acceptConnections():
    tcpConn, tcpAddr = tcpSocket.accept();
    print 'Connection adress: ', tcpAddr
    while (1):
        data = tcpConn.recv (TCPBUFFERSIZE);
        if (not data): break;
        print 'Received data: ', data
        tcpConn.send (data);
    tcpConn.close();


while 1:
    acceptConnections();





