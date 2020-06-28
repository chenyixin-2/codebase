package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"log"
	"net"
	"unsafe"
)

type MQTTMsg struct {
	Len     uint8
	MsgType uint8
	Flags   uint8
	TopicId [2]uint8
	MsgId   uint16
	Data    *[]uint8
}

func serialize(m *MQTTMsg, packet *[]byte) {
	len_byte := byte(binary.Size((*packet)))
	msgtype_byte := byte(m.MsgType)
	flag_byte := byte(m.Flags)
	tid_bytes := make([]byte, 2)
	tid_bytes[0] = m.TopicId[0]
	tid_bytes[1] = m.TopicId[1]
	fmt.Println(tid_bytes)
	mid_bytes := make([]byte, 2)
	binary.BigEndian.PutUint16(mid_bytes, m.MsgId)
	payload_buf := new(bytes.Buffer)
	binary.Write(payload_buf, binary.BigEndian, m.Data)

	(*packet)[0] = len_byte
	(*packet)[1] = msgtype_byte
	(*packet)[2] = flag_byte
	copy((*packet)[3:5], tid_bytes)
	copy((*packet)[5:7], mid_bytes)
	copy((*packet)[7:], payload_buf.Bytes())

	fmt.Println(*packet)
}

func sendUDP(dstIp string, dstPort string, data *[]byte) {

	service := dstIp + ":" + dstPort

	remoteAddr, err := net.ResolveUDPAddr("udp4", service)

	if err != nil {
		log.Fatal(err)
	}

	conn, err := net.DialUDP("udp", nil, remoteAddr)

	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()

	//message := []byte("hello udp server!")
	_, err = conn.Write(*data)

	if err != nil {
		log.Println(err)
	}

	//listener, err := net.ListenUDP("udp", &net.UDPAddr{IP: net.ParseIP(dstIp), Port: dstPort})
	/* 	if err != nil {
	   		fmt.Println(err)
	   		return
	   	}

	   	fmt.Printf("Local: <%s> \n", listener.LocalAddr().String())

	   	for {
	   		_, err := listener.WriteTo([]byte{"world"})

	   		if err != nil {
	   			fmt.Println(err.Error())
	   		}
	   	} */
}

func main() {
	var msg MQTTMsg

	msg = MQTTMsg{
		Len:     0,
		MsgType: 0x0c,
		Flags:   0x62,
		MsgId:   0x0000,
		Data:    nil,
	}
	msg.TopicId[0] = 't'
	msg.TopicId[1] = 't'
	fmt.Println(msg.TopicId)

	payload := []uint8{'m', 'y', 'p', 'a', 'y', 'l', 'o', 'a', 'd'}
	msg.Data = &payload

	/* 	s1 := binary.Size(msg) ==> -1
	   	fmt.Println(s1)
	   	s2 := binary.Size(msg.Data)
	   	fmt.Println(s2)
	   	s3 := binary.Size(payload)
	   	fmt.Println(s3)
	*/
	const msg_size = unsafe.Sizeof(msg)

	packet := make([]byte, msg_size)
	serialize(&msg, &packet)
	sendUDP("127.0.0.1", "10000", &packet)
}
