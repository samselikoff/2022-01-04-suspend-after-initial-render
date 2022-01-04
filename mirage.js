import { createServer } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.get(
        "/api/users",
        (schema, request) => {
          return { users: [{ id: request.params.id }] };
        },
        { timing: 1500 }
      );

      this.get(
        "/api/user/:id",
        (schema, request) => {
          return { user: { id: request.params.id } };
        },
        { timing: 2000 }
      );

      this.namespace = "";
      this.passthrough();
    },
  });

  // Don't log passthrough
  server.pretender.passthroughRequest = () => {};

  return server;
}
