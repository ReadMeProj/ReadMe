package proto 

import (
	"crypto/rand"
	"fmt"
  )

func TokenGenerator(len int) string {
	b := make([]byte, len)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}