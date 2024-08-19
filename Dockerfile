# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:14.17.1
#
# # 创建app目录
RUN mkdir -p /home/blog-server
#
# # 设置工作目录
WORKDIR /home/blog-server
#
# # 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /home/blog-server/package.json
#
# # 安装npm依赖(使用淘宝的镜像源)
# # 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --registry=https://registry.npm.taobao.org
#
# # 拷贝所有源代码到工作目录
COPY . /home/blog-server
#
# # 暴露容器端口
EXPOSE 7001
#
CMD nohup sh -c 'npm run ci && npm run start'
