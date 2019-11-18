import Router from "koa-router";
import axios from "./utils/axios";

let router = new Router({ prefix: `/geo` });

const sign = `abcd`;

router.get(`getPosition`, async (ctx) => {});

export default router;
