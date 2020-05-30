#include <stdio.h>      /* for printf() and fprintf() */
#include <sys/socket.h> /* for socket(), connect(), send(), and recv() */
#include <arpa/inet.h>  /* for sockaddr_in and inet_addr() */
#include <stdlib.h>     /* for atoi */
#include <string.h>     /* for memset() */
#include <unistd.h>     /* for close() */

#define RCVBUFSIZE 32 /* Size of receive buffer */

#include "DieWithError.h"

int main(int argc, char *argv[])
{
    int sock;
    struct sockaddr_in echoServAddr;
    unsigned short echoServPort;
    char *servIP;
    char *echoString;

    char echoBuffer[RCVBUFSIZE];

    unsigned int echoStringLen;
    int bytesRcvd, totalBytesRcvd;

    if ((argc < 3) || (argc > 4))
    {
        fprintf(stderr, "Usage: %s <Server IP> <Echo Word> [<Echo Port>]\n", argv[0]);
        exit(1);
    }

    servIP = argv[1];
    echoString = argv[2];
    if (argc == 4)
        echoServPort = atoi(argv[3]);
    else
        echoServPort = 7;

    if ((sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP)) < 0)
    {
        DieWithError("socket() failed");
    }
    /* construct the server address structure */
    memset(&echoServAddr, 0, sizeof(echoServAddr));
    echoServAddr.sin_family = AF_INET;                /* internet address family */
    echoServAddr.sin_addr.s_addr = inet_addr(servIP); /* server ip address */
    echoServAddr.sin_port = htons(echoServPort);      /* server port */

    /* Establish the connection to the echo server */
    if (connect(sock, (struct sockaddr *)&echoServAddr, sizeof(echoServAddr)) < 0)
    {
        DieWithError("connect() failed");
    }
    echoStringLen = strlen(echoString); /* Detemine input length */

    if (send(sock, echoString, echoStringLen, 0) != echoStringLen)
    {
        DieWithError("send() sent a different number of bytes than expected");
    }
    totalBytesRcvd = 0;
    printf("Received: "); /* Setup to print the echoed string */
    while (totalBytesRcvd < echoStringLen)
    {
        /* receive up to the buffer size (minus 1 to leave space for a null terminator) bytes from the sender */
        if ((bytesRcvd = recv(sock, echoBuffer, RCVBUFSIZE - 1, 0)) <= 0)
        {
            DieWithError("recv() failed or connection closed prematurely");
            totalBytesRcvd += bytesRcvd;
            echoBuffer[bytesRcvd] = '\0';
            printf(echoBuffer);
        }
    }
    printf("\n");

    close(sock);
    exit(0);
}