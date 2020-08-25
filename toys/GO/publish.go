package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"log"
	"net"
)

type MQTTMsg struct {
	Len     uint8
	MsgType uint8
	Flags   uint8
	TopicId [2]uint8
	MsgId   uint16
	Data    *[]byte
}

func serialize(m *MQTTMsg, packet *[]byte) {
	len_byte := byte(binary.Size((*packet)))
	msgtype_byte := byte(m.MsgType)
	flag_byte := byte(m.Flags)
	tid_bytes := make([]byte, 2)
	tid_bytes[0] = m.TopicId[0]
	tid_bytes[1] = m.TopicId[1]
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

/* func main() {
	var (
		payload = flag.String("data", "mypayload", "Payload data")
	)
	flag.Parse()

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

	payload_bytes := []byte(*payload)
	msg.Data = &payload_bytes

	const msg_size = unsafe.Sizeof(msg)
	fmt.Println(msg_size)

	packet := make([]byte, msg_size)
	serialize(&msg, &packet)
	sendUDP("127.0.0.1", "10000", &packet)
} */
