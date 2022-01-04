import { createServer } from "miragejs";

function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.get(
        "/api/messages",
        (schema, request) => {
          return {
            messages: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
          };
        },
        { timing: 1000 }
      );

      this.get(
        "/api/messages/:id",
        (schema, request) => {
          return { message: { id: request.params.id } };
        },
        { timing: 1500 }
      );

      this.namespace = "";
      this.passthrough();
    },
  });

  // Don't log passthrough
  server.pretender.passthroughRequest = () => {};

  return server;
}

let isClient = typeof window !== "undefined";
if (isClient && process.env.NODE_ENV === "development") {
  if (!window.server) {
    window.server = makeServer({ environment: "development" });
  }
}
