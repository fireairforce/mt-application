import glob from 'glob';
import { resolve } from 'path';

// 定义一个自动加载mongoose.model的schena函数
export const initSchemas = () => {
    glob.sync(resolve(__dirname,'./models/','**/*.js')).forEach(require);
}