// ThreadPool.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>

#include <threadpoolapiset.h>
#include <winbase.h>

#include <functional>
//https://dorodnic.com/blog/2015/10/17/windows-threadpool/

class ThreadPool
{
public:
	ThreadPool();
	ThreadPool(unsigned minThreads, unsigned maxThreadds);

	// assign copy operator
	ThreadPool(const ThreadPool&) = delete;
	ThreadPool& operator=(const ThreadPool&) = delete;
	// move operator
	ThreadPool(ThreadPool&& other) = default;
	ThreadPool& operator=(ThreadPool&& other) = default;

	~ThreadPool();
public:
	ThreadPoolWork SubmitCallback(std::function<void()> workItem);

private:
	PTP_POOL _pool;
	_TP_CALLBACK_ENVIRON_V3 _environment;
	PTP_CLEANUP_GROUP _cleanupGroup;
};

ThreadPool::ThreadPool() {

	// 1. Create thread pool
	_pool = ::CreateThreadpool(nullptr);
	if (_pool == nullptr) {
		throw std::exception("Could not create a thread pool");
	}
	// 2. Initize the thread-pool environment struct
	::InitializeThreadpoolEnvironment(&_environment);
	::SetThreadpoolCallbackPool(&_environment, _pool);
	::SetThreadpoolCallbackLibrary(&_environment, GetModuleHandle(nullptr));

	// 3. Create thread-pool clean up group
	_cleanupGroup = ::CreateThreadpoolCleanupGroup();
	if (_cleanupGroup == nullptr) {
		::DestroyThreadpoolEnvironment(&_environment);
		::CloseThreadpool(_pool);
		throw std::exception("Could not create a thread pool clean-up group");
	}
	::SetThreadpoolCallbackCleanupGroup(&_environment, _cleanupGroup, nullptr);
}

ThreadPool::ThreadPool(unsigned minThreads, unsigned maxThreads) : ThreadPool(){
	::SetThreadpoolThreadMaximum(_pool, maxThreads);
	::SetThreadpoolThreadMinimum(_pool, minThreads);
}

ThreadPool::~ThreadPool()
{
	::CloseThreadpoolCleanupGroupMembers(_cleanupGroup, false, nullptr);
	::DestroyThreadpoolEnvironment(&_environment);
	::CloseThreadpool(_pool);
}

// For the following £º
// what is "ThreadPoolWork" ?
// 1. https://dorodnic.com/blog/2015/10/17/windows-threadpool/
// 2. Windows via C++

int main()
{
    std::cout << "Hello World!\n";
}