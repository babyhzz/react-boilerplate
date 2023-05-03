# TODO

- [ ] Antd 动态主题
- [ ] 正则表达式工具
- [ ] react router和menu配置统一

# 配置

## ESLint 的配置

安装 webpack 插件：[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)

3.0 版本仅适用于 webpack5。eslint-loader 即将废弃，请使用该插件。

```json
{
  "devDependencies": {
    "eslint": "^8.38.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-webpack-plugin": "^4.0.1",
    "@typescript-eslint/eslint-plugin": "^5.58.0",
    "@typescript-eslint/parser": "^5.58.0"
  }
}
```

[eslint](http://eslint.cn/docs/user-guide/configuring)哪些配置：

- rules：eslint 规则
  - [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) js&es6+的一些规范，需要依赖 eslint 和 [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)（主要是 inport/export 的语法的 lint）
- formatter：配置展示 lint 结果的方式
- plugins: 自定义一些规则，自定义一些配置和环境变量，自定义其他文件如 ts 的处理器提取 js 代码
- environment：指定脚本的运行环境，每种环境有特定的全局变量。
- globals：执行期间访问的额外的全局变量

eslint 的默认解析器不能解析 ts 的语法，为了在 ts 中使用 eslint，需要使用 [typescript-lint](https://typescript-eslint.io/) 工具

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
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  // tells ESLint to use the @typescript-eslint/parser package you installed
  // to parse your source files.
  parser: "@typescript-eslint/parser",
  // tells ESLint to load the @typescript-eslint/eslint-plugin package as a plugin.
  plugins: ["@typescript-eslint"],
  root: true,
};
```

**eslint 与 react**， 安装一下两个插件：

[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)

- 使用预设，直接 extends 中加入 "plugin:react/recommended"
- 如果要自己一个个调，加入插件并加入需要的 rules

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

同理，直接使用预设："plugin:react-hooks/recommended"

自定义：https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#custom-configuration

eslint 不能识别@符号，需要安装 [eslint-import-resolver-alias](https://www.npmjs.com/package/eslint-import-resolver-alias) 插件，并进行配置

```
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
```

## babel 的配置

不使用 ts-loader 去编译 ts 文件，这里使用 babel 去实现。

[babel vs tsc](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)：babel 用来编译，tsc 用来生成声明文件。（组件库可以这么弄）

**@babel/preset-env**

允许使用最新的 JS 语法。不会包含小于 stage-3 阶段的提案，因为浏览器不会实现。

> 关于新语法的几个阶段：
>
> - Strawman（Stage 0，稻草人）
> - Proposal（Stage 1，提议）
> - Draft（Stage 2，草案）
> - Candidate（Stage 3，候选），意味着很大程度能进入标准
> - Finished（Stage 4，完成）

加上 [`.browserslistrc`](https://github.com/browserslist/browserslist) 文件来指定目标，处理兼容性文件。当前项目的配置在 package.json 文件中，使用推荐的 defaults 即可。

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

- entry: 在入口处手动导入，import "core-js"; 将根据环境自动展开导入，导入的会比较多，可以手动指定导入部分
- usage: 导入使用的部分

```
    [
      // 具体参数配置：https://www.babeljs.cn/docs/babel-preset-env#corejs
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "3.8"
      }
    ],
```

**@babel/preset-react**

解析 react 语法 https://babeljs.io/docs/babel-preset-react

**@babel/preset-typescript**

转义 ts 语法 https://babeljs.io/docs/babel-preset-typescript

## ts 配置

tsconfig.json

```json
{
  "noEmit": true // 不生成编译后的文件，ts、tsx的编译工作交给 babel 去做
}
```

## prettier 配置

- eslint-config-prettier 关闭冲突的 eslint 配置
- eslint-plugin-prettier 以 eslint 的方式检测 prettier 的错误

[官网](https://www.prettier.cn/docs/install.html)

如何更好的和 eslint 配合工作：[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)

> It turns off all ESLint rules that are unnecessary or might conflict with Prettier. There’s a similar config for Stylelint: [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)
>
> Extending `"prettier"` turns off a bunch of core ESLint rules, as well as a few rules from these plugins:
>
> - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
> - [@babel/eslint-plugin](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)
> - [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
> - [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
> - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
> - [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard)
> - [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
> - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

如果需要以 eslint 的方式报出格式的问题，需要安装 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) 这个插件，把 prettier 的规则作为 eslint 的 rule。

> - [prettier-eslint](https://github.com/prettier/prettier-eslint)的作用？

## stylelint 配置

```
npm init stylelint
```

使用该命令会自动生成 .stylelintrc.json 配置文件。

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
- 。。。？

待理解

# Vercel 的部署

由于我们的静态网站并且使用的 history mode 的路由，需要做一些路由配置：

[vercel 配置文件](https://vercel.com/docs/concepts/projects/project-configuration#project-configuration/rewrites)

# Antd

:where :is 的作用及其区别：

https://www.dongchuanmin.com/xhtml/2463.html

`:where()` 和 `:is()` 的不同之处在于，`:where()` 的优先级**总是为 0** ，但是 `:is()` 的优先级是由它的选择器列表中优先级最高的选择器决定的。

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
