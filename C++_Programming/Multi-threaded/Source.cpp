#include <iostream>
#include <windows.h>
using namespace std;

#include <process.h>
#include <stdio.h>

DWORD WINAPI myThread(LPVOID lpParameter) {
	unsigned int& myCounter = *((unsigned int*)lpParameter);
	//while (myCounter < 0xFFFFFFFF) ++myCounter;
	while(true)	++myCounter;
	return 0;
}

//#define COUT_SAFE
#define PRINTF_UNSAFE

DWORD WINAPI mythreadA(__in LPVOID lpParameter)
{
#ifdef PRINTF_UNSAFE
	printf("CreateThread %d \n", GetCurrentThreadId());
#endif // 

#ifdef COUT_SAFE
	cout << "Thread A" << endl;
#endif

#ifdef PRINTF_SAFE

#endif // PRINTF_SAFE

	return 0;
}

unsigned int __stdcall mythreadB(void* data) {
#ifdef PRINTF_UNSAFE
	printf("_beginthreadex %d \n", GetCurrentThreadId());
#endif // 

#ifdef COUT_SAFE
	cout << "Thread B" << endl;
#endif

#ifdef PRINTF_SAFE
#endif // PRINTF_SAFE
	return 0;
}

void mythreadC(void* data)
{
#ifdef PRINTF_UNSAFE
	printf("_beginthreaded %d \n", GetCurrentThreadId());
#endif // 

#ifdef COUT_SAFE
	cout << "Thread C" << endl;
#endif
#ifdef PRINTF_SAFE
#endif // PRINTF_SAFE
	return;
}

int main()
{
	cout << "value of __LINE__" << __LINE__ << endl;
	cout << "value of __FILE__" << __FILE__ << endl;
	cout << "value of __DATE__" << __DATE__ << endl;
	cout << "value of __TIME__" << __TIME__ << endl;

	using namespace std;

	// Example #1
	unsigned int myCounter = 0;
	DWORD myThreadID;
	HANDLE myHandle = CreateThread(0, 0, myThread, &myCounter, 0, &myThreadID);
	char mychar = ' ';
	while (mychar != 'q') {
		cout << myCounter << endl;
		mychar = getchar();
	}
	::TerminateThread(myHandle, -1);
	CloseHandle(myHandle);

	//// Example #2
	HANDLE myhandleA, myhandleB, myHandleC;

	myhandleA = CreateThread(0, 0, mythreadA, 0, 0, 0);   
	WaitForSingleObject(myhandleA, INFINITE);
	CloseHandle(myhandleA);

	myhandleB = (HANDLE)_beginthreadex(0, 0, &mythreadB, 0, 0, 0);
	WaitForSingleObject(myhandleB, INFINITE);
	CloseHandle(myhandleB);

	myHandleC = (HANDLE)_beginthread(&mythreadC, 0, 0);
	getchar();

	// Example #3 : batch of handles
	HANDLE myhandle[3];
	myhandle[0] = CreateThread(0, 0, mythreadA, 0, 0, 0);
	myhandle[1] = (HANDLE)_beginthreadex(0, 0, &mythreadB, 0, 0, 0);
	myhandle[2] = (HANDLE)_beginthread(&mythreadC, 0, 0);
	::WaitForMultipleObjects(sizeof(myhandle) / sizeof(myhandle[0]), myhandle, true, INFINITE);

	for (auto& handle : myhandle) {
		::TerminateThread(handle, 0);
		::CloseHandle(handle);
	}

	// Example #4 : Operation to handles
	HANDLE myhandle_opt;
	myhandle_opt = CreateThread(0, 0, myThread, &myCounter, CREATE_SUSPENDED, &myThreadID);
	cout << ::ResumeThread(myhandle_opt) << endl;
	cout << ::SuspendThread(myhandle_opt) << endl;

	// Example #5 : 

	return 0;
}