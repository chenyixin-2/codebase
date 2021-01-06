#include <stdio.h>		/* for printf() and fprintf() */
#include <sys/socket.h> /*  for socket(), bind(), and connect() */
#include <arpa/inet.h>	/* for sockaddr_in and inet_ntoa */
#include <stdlib.h>		/* for atoi */
#include <string.h>		/* for memset */
#include <unistd.h>		/* for close() */

#define MAXPENDING 5 /* Maximum outstanding connection requests */

#include "DieWithError.h"
#include "HandleTcpClient.h"

int main(int argc, char *argv[])
{
	int servSock;
	int clntSock;

	struct sockaddr_in echoServAddr;
	struct sockaddr_in echoClientAddr;

	unsigned short echoServPort;
	unsigned int clntLen;

	if (argc != 2)
	{
		fprintf(stderr, "Usage: %s <Server Port>\n", argv[0]);
		exit(1);
	}

	echoServPort = atoi(argv[1]);

	if ((servSock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP)) < 0)
		DieWithError("socket() failed");

	memset(&echoServAddr, 0, sizeof(echoServAddr)); /* Zero out structure */
	echoServAddr.sin_family = AF_INET;
	echoServAddr.sin_addr.s_addr = htonl(INADDR_ANY);
	echoServAddr.sin_port = htons(echoServPort);

	if (bind(servSock, (struct sockaddr *)&echoServAddr, sizeof(echoServAddr)) < 0)
		DieWithError("bind() failed");

	if (listen(servSock, MAXPENDING) < 0)
		DieWithError("listen() failed");

	for (;;)
	{
		/* set the size of the in-out parameter */
		clntLen = sizeof(echoClientAddr);

		/* wait for a client to connect */
		if ((clntSock = accept(servSock, (struct sockaddr *)&echoClientAddr, &clntLen)) < 0)
			DieWithError("accept() failed");

		printf("Handling client %s\n", inet_ntoa(echoClientAddr.sin_addr));
		HandleTCPClient(clntSock);
	}
}