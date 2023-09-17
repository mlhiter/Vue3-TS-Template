### 一，项目亮点

为了方便我自己开发，减少一些配置上的重复性工作，维护的一个项目。

**整体技术栈**：Vue3+Typescript+NaiveUI+Vite

**核心工具**：

1. vue3：基础框架了，不提了
2. vue-router：路由
3. pinia：全局状态管理
4. naive-ui：非常优雅的一套组件库，适配Typescript和Vue3
5. @vueuse/core：vue核心工具包
6. axios：发请求的
7. dayjs：时间相关的工具
8. lodash：JS的基本处理性的工具包
9. vue-echarts+echarts：画图表的
10. vue-i18n：国际化

**提高开发体验的工具：**

1. unocss：原子化css引擎，简单的说就是可以在元素上直接写css而且更方便
2. less：css预处理器，还阔以，用的不多但要有
3. vite：构建工具
4. 规范化工具：ESLint+Prettier+Husky+CommitLint+StyleLint
5. Typescript：类型化js，虽然代码写的多了点，但是开发体验还是不错的
6. 自动导入工具
   1. unplugin-auto-import：自动导入基本vue工具函数
   2. unplugin-icons：自动导入icon
   3. unplugin-vue-components：自动导入组件（全局组件、组件库组件）
   4. vite-plugin-style-import：有些组件库无法自动导入样式，这个做一下处理

### 二，基本命令

> 注意：需要提前有pnpm安装，如果没全局安装pnpm运行`npm install -g pnpm`

- pnpm install #安装依赖
- pnpm run dev #运行服务器
- pnpm run build #打包构建
- pnpm run preview #打包构建之后预览
- pnpm run eslint #执行eslint格式化
- pnpm run prettier #执行prettier格式化

### 三，项目结构

.github：github配置ci/cd
.husky：git钩子机制执行一些命令
.vscode：vscode配置文件，包括设置和推荐的extension
node_modules：项目依赖包
public：公共组件，一般我会把项目的ico放在这

src ：项目源码文件夹

- src/api ：api请求

- src/assets ：静态内容，包括字体和组件


- src/components：全局组件
- src/hooks：有状态工具函数组件文件夹（全局）


- src/layout：布局文件夹，如侧边栏和标题栏组件这种基本一直在的组件
- src/locales：国际化文件夹，处理语言文字替换
- src/plugin：插件文件夹


- src/router：路由文件夹


- src/style：全局样式文件夹
- src/store：全局状态管理文件夹


- src/utils：无状态工具函数文件夹


- src/views：页面组件文件夹


- src/main.js：入口js文件


- src/App.vue：入口vue文件

test：测试文件夹
types：全局类型文件夹，放unplugin组件的生命types
.env.development：开发模式环境变量
.env.production：生产模式环境变量
.eslintignore：ESLint忽略文件
.eslintrc-auto-import.json：处理ESLint报错自动引入工具的文件
.eslintrc.json：ESLint配置文件
.gitignore：git忽略文件
.lintstagedrc：git钩子执行检查文件状态的配置文件
.nvmrc：node版本限制文件
.prettierignore：prettier忽略文件
.prettierrc.json：prettier配置文件
.stylelintignore：stylelint忽略文件
.stylelintrc.json：stylelint配置文件
commitlint.config.ts：git commit信息检测配置文件
index.html：项目入口html文件
nginx.conf：nginx配置文件
package.json：项目配置文件
pnpm-lock.yaml：项目依赖关系文件
readme.md：项目的文档
tsconfig.json：typescript的配置文件
uno.config.ts：uno的配置文件
vite.config.ts：vite的配置文件

### # 注意事项

1. 更改服务器地址：在src/utils/request.js 里修改baseUrl
