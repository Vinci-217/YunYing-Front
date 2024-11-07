## 前端项目运行说明

### 开发环境

为确保前端项目顺利运行，请提前安装好node环境。若未安装，请前往[Node.js 官网](https://nodejs.org/)安装最新稳定版本。安装完成后，可运行以下命令以检查版本：

```bash
node -v
```

### 安装依赖

输入如下命令安装项目所需依赖：

```bash
npm install
```

### 运行项目

在开发环境中，输入如下命令以在本地运行项目，该命令会启动开发服务器并打开预览页面：

```bash
npm start
```

### 构建项目

输入如下用于构建项目的指令，生成优化后的生产环境代码。

```bash
npm run build
```

代码放在build文件夹下，打开该文件夹下的index.html即可访问本项目。

注意：直接本地打开index.html可能无法访问，因为缺乏服务器的支持，可以使用以下方式启动一个简单的本地服务器：

输入命令安装serve包：

```bash
npm install -g serve
```

在本项目根目录输入命令部署build：

```bash
serve -s build
```

## 技术栈

![](https://img.shields.io/badge/HTML5-%23E34F26?style=flat-square&logo=html5&logoColor=%23fff)
![](https://img.shields.io/badge/CSS3-%231572B6?style=flat-square&logo=css3&logoColor=%23fff)
![](https://img.shields.io/badge/TypeScript-%233178C6?style=flat-square&logo=typescript&logoColor=%23fff)
![](https://img.shields.io/badge/React-%2361DAFB?style=flat-square&logo=react&logoColor=%23fff)
![](https://img.shields.io/badge/Webpack-%238DD6F9?style=flat-square&logo=webpack&logoColor=%23fff)
![](https://img.shields.io/badge/Ant%20Design-%230170FE?style=flat-square&logo=antdesign&logoColor=%23fff)