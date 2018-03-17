import socket


TCPIP = "127.0.0.1";
TCPPORT = "5005";
TCPBUFFERSIZE = 1024;

tcpSocket = socket.socket (socket.AF_INET, socket.SOCK_STREAM);
tcpSocket.bind ((TCPIP, TCPPORT))
tcpSocket.listen (1);

tcpConn, tcpAddr = tcpSocket.accept();
print 'Connection adress: ', tcpAddr
while (1):
    data = tcpConn.recv (BUFFER_SIZE);
    if (!data): break;
    print 'Received data: ', data
    tcpConn.send (data);
tcpConn.close();
