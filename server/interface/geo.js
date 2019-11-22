import Router from "koa-router";
import axios from "./utils/axios";
import Province from "./../dbs/models/province";
import City from "./../dbs/models/cities";

let router = new Router({ prefix: "/geo" });

router.get(`/getPosition`, async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: "",
      city: ""
    };
  }
});

router.get(`/province`, async ctx => {
  let province = await Province.find();
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value
      };
    })
  };
});

router.get(`/province/:id`, async ctx => {
  // console.log(ctx.params.id);
  let city = await City.findOne({ id: ctx.params.id });
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return { province: item.province, id: item.id, name: item.name };
    })
  };
});

export default router;
