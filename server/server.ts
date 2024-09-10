import { createServer } from "node:http"
import { Server, Socket } from "socket.io"
import { Message } from "../utils/interfaces"
import next from "next"

const hostname = "localhost"
const port = process.env.NODE_ENV === "production" ? 80 : 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev, hostname, port })

const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on("connection", (client) => {
    // Remove the client from the array (this is for better performance ig idk)
    client.on("disconnect", (reason) => {
      console.log(`Client disconnected (${reason})`)
    })

    client.on("message", (value: string) => {
      const message: Message = JSON.parse(value)
      message.author = client.id

      io.send({
        author: message.author,
        content: message.content,
      })
    })
  })

  httpServer
    .once("error", (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
