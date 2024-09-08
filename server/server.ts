import { createServer } from "node:http"
import { Server, Socket } from "socket.io"
import next from "next"

const hostname = "localhost"
const port = 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev, hostname, port })

const handler = app.getRequestHandler()

let clients: Socket[] = []

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on("connection", (client) => {
    // Add the client to the clients array for global messaging
    clients.push(client)

    // Remove the client from the array (this is for better performance ig idk)
    client.on("disconnect", (reason) => {
      const disClient = clients.find((disClient) => disClient === client)

      if (disClient) {
        const index = clients.indexOf(disClient)
        clients.splice(index, 1)
      }

      console.log(`Client disconnected (${reason})`)
    })

    client.on("message", (message) => {
      clients.forEach((client) => {
        client.send(message)
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
