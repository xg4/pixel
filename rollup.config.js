import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  nodeResolve({ extensions }),
  commonjs(),
  babel({
    extensions,
  }),
  terser(),
]

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.exports['.'].import,
      format: 'esm',
    },
    {
      file: pkg.exports['.'].require,
      format: 'cjs',
    },
    {
      name: 'Pixel',
      file: pkg.browser,
      format: 'umd',
    },
  ],
  plugins,
}
