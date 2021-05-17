package proto 

import (
	"crypto/rand"
	"fmt"
  )

const lenID = 20

func TokenGenerator() string {
	b := make([]byte, lenID)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}