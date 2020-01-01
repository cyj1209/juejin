const next = require("next");
const KaoApp = require("koa");
const koaBody = require("koa-body");
const k2c = require("koa2-connect");
const proxy = require("http-proxy-middleware");
import * as Koa from "koa";

// import * as NextType from "next";
import Server from "next/dist/next-server/server/next-server";

const dev = process.env.NODE_ENV !== "production";
const app: Server = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server: Koa = new KaoApp();

  server.use(async (ctx, next) => {
    if (ctx.path.startsWith("/resources")) {
      console.log("here is proxy");
      return await k2c(
        proxy({
          target: "https://extension-ms.juejin.im",
          changeOrigin: true
        })
      )(ctx);
    }
    await next();
  });

  server.use(koaBody());
  server.use(async (ctx: Koa.Context) => {
    await handle(ctx.req, ctx.res);
  });

  server.listen(4001, () => {
    console.log("koa server listening on 4001");
  });
});
