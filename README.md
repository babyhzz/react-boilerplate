# TODO

- [ ] PostCSS
- [ ] ESLint
- [ ] Antd 主题
- [ ] DLL 提高编译速度
- [ ] HMR 原理及集成
- [ ] .global.less 添加



# 配置

## 插件

### eslint-webpack-plugin

3.0版本仅适用于webpack5。

eslint-loader即将废弃，请使用该插件。

```json
{
  "devDependencies": {
    "eslint": "^8.38.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-webpack-plugin": "^4.0.1",
  }
}
```



eslint是什么：

- rules：eslint规则
  - [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)  js&es6+的一些规范，需要依赖 eslint 和 [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)（主要是inport/export的语法的lint）
- formatter：配置展示lint结果的方式
- plugins: 自定义一些规则，自定义一些配置和环境变量，自定义其他文件如ts的处理器提取js代码









eslint的默认解析器不能解析 ts 的语法，为了在 ts 中使用 eslint，需要使用 [typescript-lint](https://typescript-eslint.io/) 工具

> `typescript-eslint`:
>
> - allows ESLint to parse TypeScript syntax
> - creates a set of tools for ESLint rules to be able to use TypeScript's type information
> - provides a large list of lint rules that are specific to TypeScript and/or use that type information

```
yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

参考配置：https://typescript-eslint.io/getting-started

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  // tells ESLint to use the @typescript-eslint/parser package you installed 
  // to parse your source files.
  parser: '@typescript-eslint/parser',
  // tells ESLint to load the @typescript-eslint/eslint-plugin package as a plugin.
  plugins: ['@typescript-eslint'],
  root: true,
};
```



# 参考：





# 规范

## Git 提交规范





- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
