# TODO

- [ ] Antd 动态主题
- [ ] 正则表达式工具
- [ ] react router 和 menu 配置统一
- [ ] 文档编写
- [ ] hooks依赖是否生效
- [ ] lint-staged

# 配置

## ESLint

### ESLint 简介

[eslint](http://eslint.cn/docs/user-guide/configuring)哪些配置：

- rules：eslint 规则
  - [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) js&es6+的一些规范，需要依赖 eslint 和 [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)（主要是 import/export 的语法的 lint）
- formatter：配置展示 lint 结果的方式
- plugins: 自定义一些规则，自定义一些配置和环境变量，自定义其他文件如 ts 的处理器提取 js 代码
- environment：指定脚本的运行环境，每种环境有特定的全局变量。
- globals：执行期间访问的额外的全局变量

### ESLint 配置

**[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)**

该插件主要是配合 webpack 使用 eslint 找到 JS 代码的问题，并且进行修复。3.0 版本仅适用于 webpack5。

> eslint-loader 即将废弃，请使用该插件。

**[typescript-lint](https://typescript-eslint.io/)**

eslint 的默认解析器不能解析 ts 的语法，为了在 ts 中使用 eslint，需要使用 [typescript-lint](https://typescript-eslint.io/) 工具。

主要功能如下：

- allows ESLint to parse TypeScript syntax
- creates a set of tools for ESLint rules to be able to use TypeScript's type information
- provides a large list of lint rules that are specific to TypeScript and/or use that type information

主要依赖这两个库：@typescript-eslint/parser 和 @typescript-eslint/eslint-plugin

```shell
yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

```js
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  // tells ESLint to use the @typescript-eslint/parser package you installed
  // to parse your source files.
  parser: "@typescript-eslint/parser",
  // tells ESLint to load the @typescript-eslint/eslint-plugin package as a plugin.
  plugins: ["@typescript-eslint"],
  root: true,
};
```

该插件更多的使用详情查看[官网](https://typescript-eslint.io/getting-started)。

**[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) 和 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)**

若要 ESLint 和 React 一起使用，则需要使用这两个插件。在 extends 中加入这两个插件的预设。

```js
module.exports = {
  extends: [
    // ...
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    // ...
  ],
};
```

**[eslint-import-resolver-alias](https://www.npmjs.com/package/eslint-import-resolver-alias)**

eslint 不能识别@符号，需要安装 [eslint-import-resolver-alias](https://www.npmjs.com/package/eslint-import-resolver-alias) 插件，并进行配置。

```js
module.exports = {
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
};
```

**[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)**

js 代码的一些 rules 配置，用来规范代码。

## Babel

这里不使用 `ts-loader` 去编译 ts 文件，这里使用 babel 去实现。这里要求 tsconfig.json 中 `"isolatedModules": true`。

[Using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)

> This technique is a hybrid approach, using Babel’s [preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) to generate your JS files, and then using TypeScript to do type checking and `.d.ts` file generation.

[**@babel/preset-typescript**](https://babeljs.io/docs/babel-preset-typescript)

主要包含 [@babel/plugin-transform-typescript](https://babeljs.io/docs/babel-plugin-transform-typescript) 插件，用于转换 ts 代码

[**@babel/preset-react**](https://babeljs.io/docs/babel-preset-react)

React 语法的转换预设

[**@babel/preset-env**](https://babeljs.io/docs/babel-preset-env)

允许使用最新的 JS 语法。不会包含小于 stage-3 阶段的提案，因为浏览器不会实现。

> 关于新语法的几个阶段：
>
> - Strawman（Stage 0，稻草人）
> - Proposal（Stage 1，提议）
> - Draft（Stage 2，草案）
> - Candidate（Stage 3，候选），意味着很大程度能进入标准
> - Finished（Stage 4，完成）

加上 [`.browserslistrc`](https://github.com/browserslist/browserslist) 文件来指定目标，处理兼容性文件。当前项目直接配置在 package.json 中，使用推荐的 defaults 即可。

```
  "browserslist": {
    "production": ["defaults"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
```

> `defaults`: Browserslist’s default browsers (`> 0.5%, last 2 versions, Firefox ESR, not dead`).

针对 polyfill 的配置是 [useBuiltIns](https://babeljs.io/docs/babel-preset-env#usebuiltins):

- entry: 在入口处手动导入，`import "core-js";` 将根据环境兼容性进行全量导入
- usage: 导入使用的部分

```json
[
  "@babel/preset-env",
  {
    "useBuiltIns": "usage",
    "corejs": "3.8"
  }
],
```

## tsconfig.json

- target & module：ESNext // 由于我们使用 babel 来编译 ts 故 targe 和 module 都使用最新的 ESNext。

- jsx：preserve // 由于使用 babel 来编译 TS，对于 jsx 的代码保留即可

- noEmit: true // 不需要输出任何文件

- strict: true // 严格模式

- moduleResolution: "node" // 使用 node 的模块寻找策略

- allowSyntheticDefaultImports：不然 `import React from 'react'` 会报类型错

## Prettier

**[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)**

仅关闭和 Prettier 冲突的 ESLint rules，注意一定要放在 ESLint 配置文件中 extends 属性配置的最后。

由于关闭后无法检测这些规则，因此我们需要第二个插件



**[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)**

将 Prettier 的规则作为 ESLint 的 rule 进行检测，并且给出提示。

```js
  plugins: [..., "prettier"],
  rules: {
    ...,
    "prettier/prettier": "error",
  },
```

> 题外：[prettier-eslint](https://github.com/prettier/prettier-eslint) 的作用？

## stylelint 配置

```
npm init stylelint
```

使用该命令会自动生成 `.stylelintrc.json` 配置文件。

由于 stylelint 不认识 less 语法，需要安装 postcss-less

```
yarn add postcss-less -D
```

并配置：

```
"customSyntax": "postcss-less",
```

最后 stylelint 不能识别 global，需要将添加了 rules，最终完整的配置：

```json
{
  "customSyntax": "postcss-less",
  "extends": ["stylelint-config-standard"],
  "rules": {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ]
  }
}
```

> 这里可以配置 vscode 的代码保存自动修复

## PostCSS 的配置

使用 `postcss-preset-env` 插件，这个插件包含一些内容：

- polyfill？
- 使用新语法
- Autoprefixer
- ...？

待理解

# 问题记录

**1. dev 模式下非根路由 404**

由于是 history 路由模式，因此需要对 devServer 做 fallback 配置：

```js
devServer: {
  historyApiFallback: true,
}
```

配置后没有 404，但是发现 js 和 css 资源找不到，需要配置 publicPath 属性，默认是相对路径，这里配置成绝对路径：

```
output: {
  publicPath: "/",
}
```

**2. Vercel 的部署**

由于我们的静态网站并且使用的 history mode 的路由，则需要做一些路由配置，vercel 中的配置是通过其规定的 json 文件来完成的：[vercel 配置文件](https://vercel.com/docs/concepts/projects/project-configuration#project-configuration/rewrites)

**3. Antd :where :is 的作用及其区别**

`:where()` 和 `:is()` 的不同之处在于，`:where()` 的优先级**总是为 0** ，但是 `:is()` 的优先级是由它的选择器列表中优先级最高的选择器决定的。参考[这篇文章](https://www.dongchuanmin.com/xhtml/2463.html)。

# 规范

## Git 提交规范

- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
