> STATE-OF-THE-ART 拥抱 Rust 生态链

# Vite Electron

当前的最佳实践模版

> Oxc 暂时不太能轻易配置环境,目前使用 biome,如果要使用 react19 编译器，替换为 eslint 会更好

## feature

1. 多窗口
2. 多语言
3. 易用扩展性强

## Usage

```bash
# env
corepack enable
corepack install

# start
pnpm start

# build
pnpm build[:dev]
pnpm package:pack # or pnpm package:release

# 安装依赖到指定repo
pnpm add [module] -filter renderer

# 安装依赖到root
pnpm add [module] -w

```

## 一些出现的问题

1.  `app` 目录安装的模块，如果模块依赖了 `electron` 会导致，`electronRebuild` 使用 `app` 下的 `electron` 而非根目录的 `electron` 版本。参考 `electronRebuild` 脚本的修复方案，获取根目录版本进行固定的提交。如果有其他影响请提交 Issues。

2.  `No module named 'distutils'`

    > 这是 python 版本导致，可能跟随 electron-builder 更新已经不会出现(未测试)。

    `distutils`是 Python 标准库的一部分，通常包含在 Python 3.8 及更早版本中。从 Python 3.9 开始，`distutils`被弃用，并计划在未来的 Python 版本中完全删除。
    如果您使用的是 Python 3.9 或更高版本，您可能需要手动安装`distutils`。以下是安装步骤：

    1. **Install `distutils`**:

    - Run the following commands in the terminal:

    ```bash
    python -m ensurepip --upgrade
    python -m pip install setuptools
    ```

    2. 验证安装:
       通过在 Python 解释器中运行以下命令来确认 `distutils` 已正确安装：

    ```python
    import distutils
    print(distutils.__file__)
    ```

    如果您使用的是 Python 3.9 或更高版本，并且上述方法无法解决问题，您可以尝试安装`distutils`包：

    ```bash
    python -m pip install distutils
    ```

    如果你的系统有多个版本的 Python

    ```bash
    npm config set python /path/to/executable/python
    ```
