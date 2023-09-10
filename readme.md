
# 基本命令

pnpm install #安装依赖

pnpm run dev #运行服务器

pnpm run build #打包构建

# 文件夹结构

src文件夹外配置文件无需更改与调节

src/api 所有api请求位置

src/assets 静态内容，包括字体和组件

src/components 全局组件

src/layout 布局文件夹，如侧边栏和标题栏组件所在位置

src/router 路由文件夹

src/style 全局样式文件夹

src/utils 小功能函数，主要是处理请求相关的函数

src/views 页面主体组件文件夹

src/main.js 入口js文件

src/App.vue 入口vue文件

# 注意事项

1. 更改服务器地址：在src/utils/request.js 里修改baseUrl

ctrl + alt + l 选中变量之后，使用这个快捷键生成 console.log
alt + shift + c 注释所有 console.log
alt + shift + u 启用所有 console.log
alt + shift + d 删除所有 console.log