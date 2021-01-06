package main

import (
	"fmt"
	"math"
	"math/rand"
	"runtime"
	"strings"
	"sync"
	"time"
)

/*
func Pic(dx, dy int) [][]uint8 {
	return [0][0]
} */

const Pi = 3.14

const (
	Big   = 1 << 100
	Small = Big >> 99
)

func test() {
	var msg MQTTMsg = MQTTMsg{
		Len: 0,
	}
	fmt.Println(msg)
}

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}

/* import (
	"golang.org/x/tour/wc"
)
*/
func WordCount(s string) map[string]int {
	return map[string]int{"x": 1}
}

func sumfunc(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	fmt.Println("my favourite number is ", rand.Intn(10))

	fmt.Println("Type inference")
	v := 42 // change me
	fmt.Printf("v is of type %T\n", v)

	fmt.Println("Constants")
	const World = "世界"
	fmt.Println("Hello", World)
	fmt.Println("Happy", Pi, "Day")
	const Truth = true
	fmt.Println("Go rules?", Truth)

	fmt.Println("Numberic Constatns")
	fmt.Println(needInt(Small))
	fmt.Println(needFloat(Small))
	fmt.Println(needFloat(Big))

	fmt.Println("For")
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)

	fmt.Println("Short For")
	sum2 := 1
	for sum2 < 1000 {
		sum2 += sum2
	}
	fmt.Println(sum2)

	fmt.Println("Go's while : C's while is spelled for in Go")
	sum3 := 1
	for sum3 < 1000 {
		sum3 += sum3
	}
	fmt.Println(sum3)

	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)

	fmt.Println("Go runs on")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X")
	case "linux":
		fmt.Println("Linux")
	default:
		fmt.Printf("%s.\n", os)
	}

	fmt.Println("Switch long ring")
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning !")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}

	defer fmt.Println("world")
	fmt.Println("hello")

	fmt.Println("counting")
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("done")
	/* 注意， defer相当于有一个全局stack， FILO， 逐个返回 defer 的结果 */

	fmt.Println("Structs")
	type Vertex struct {
		X int
		Y int
	}

	fmt.Println(Vertex{1, 2})
	vt := Vertex{1, 2} // we can't use "v" here : v is pre-defined by some values
	fmt.Println(vt.X)

	fmt.Println("pointer to struct")
	pVt := &vt
	pVt.X = 1e9
	fmt.Println(v)

	fmt.Println("Struct Literals")
	var (
		v1 = Vertex{1, 2}
		v2 = Vertex{X: 1}
		v3 = Vertex{}
		p  = &Vertex{1, 2}
	)

	fmt.Println(v1, v2, v3, p)

	fmt.Println("array")
	var a [2]string
	a[0] = "hello"
	a[1] = "world"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)

	fmt.Println("Slices")
	var s []int = primes[1:4]
	fmt.Println(s)

	fmt.Println("Slices are reference")
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	an := names[0:2]
	bn := names[1:3]
	fmt.Println(an, bn)

	bn[0] = "XXX"
	fmt.Println(an, bn)
	fmt.Println(names)

	fmt.Println("Slice literals")
	sl := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(sl)

	fmt.Println("Slice defautls")
	sd := []int{2, 3, 5, 7, 11, 13}

	sd_1 := sd[1:4]
	fmt.Println(sd_1)

	sd_2 := sd[:2]
	fmt.Println(sd_2)

	sd_3 := sd[1:]
	fmt.Println(sd_3)

	sd_4 := sd[:]
	fmt.Println(sd_4)

	fmt.Println("nil !!")
	var snil []int
	fmt.Println(snil, len(snil), cap(snil))
	if snil == nil {
		fmt.Println("nil")
	}

	fmt.Println("Dynamic slice")
	ad := make([]int, 5) // len(a) = 5
	printSlice("ad", ad)

	bd := make([]int, 0, 5) // len()

	cd := bd[:2]
	printSlice("cd", cd)

	dd := cd[2:5]
	printSlice("dd", dd)

	println("Slice of slice")
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}

	var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
	fmt.Printf("Range")
	for k, v := range pow {
		fmt.Printf("2**%d = %d\n", k, v)
	}

	fmt.Println("Range : Place holder")
	pow2 := make([]int, 10)
	for i := range pow {
		pow2[i] = 1 << uint(i) // == 2 ** i
	}
	for _, v := range pow2 {
		fmt.Printf("%d\n", v)
	}

	//pic.Show(Pic)

	fmt.Println("Maps")
	type GisVertex struct {
		Lat, Long float64
	}
	mt := make(map[string]GisVertex)
	mt["Bell Labs"] = GisVertex{
		40.6833, -74.39967,
	}
	fmt.Println(mt["Bell Labs"])

	var ml = map[string]GisVertex{
		"Bell Labs": {
			40.68433, -74.39967,
		},
		"Google": {
			37.42202, -122.08408,
		},
	}
	fmt.Println(ml)

	fmt.Println("Mutating Maps")

	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"])

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"])

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok)

	//wc.Test(WordCount)
	sumc := []int{7, 8, 2, -9, 4, 0}
	c := make(chan int)
	go sumfunc(sumc[:len(s)/2], c)
	go sumfunc(sumc[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)

	fmt.Println("Buffered coroutine")

	fmt.Println("Select")
	ch := make(chan int)
	quit := make(chan int)
	// select "blocks" until one of its cases can "run"
	// ch block until someone fed them
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-ch)
		}
		quit <- 0
	}()
	fibonacci(ch, quit)

	// default selection
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	exitFor := false
	for {
		if exitFor == true {
			break
		}
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM !")
			exitFor = true
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}

	fmt.Println("Mutex")
	sf := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go sf.Inc("somekey")
	}
	time.Sleep(time.Second)
	fmt.Println(sf.Value("somekey"))
}

type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

//method of safe counter
func (c *SafeCounter) Inc(key string) {
	c.mux.Lock()
	c.v[key]++
	c.mux.Unlock()
}

//method of safe counter
func (c *SafeCounter) Value(key string) int {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mux.Unlock()
	return c.v[key]
}
