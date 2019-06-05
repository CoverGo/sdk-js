import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
// import filesize from 'rollup-plugin-filesize';
// import minify from 'rollup-plugin-babel-minify';
// import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
// import { terser } from 'rollup-plugin-terser';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'covergo-sdk',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      builtins(),
      resolve(),
      localResolve(),
      babel({ runtimeHelpers: true, exclude: ['node_modules/**']}),
      commonjs()
    ]
  },
  {
    input: 'src/index.js',
    external: ['cross-fetch'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      builtins(),
      resolve(),
      localResolve(),
      babel({ runtimeHelpers: true, exclude: ['node_modules/**'] })
    ]
  }
]
// const config = {
//   input: 'src/index.js',
//   output: [
//     {
//       file: 'build/index.js',
//       format: 'umd',
//       name: 'covergo-sdk',
//     },
//     {
//       file: 'build/index.cjs.js',
//       format: 'cjs',
//       name: 'covergo-sdk',
//     },
//     {
//       file: 'build/index.esm.js',
//       format: 'es',
//     },
//   ],
//   plugins: [
//     globals(),
//     builtins(),
//     babel({ exclude: 'node_modules/**' }),
//     localResolve(),
//     resolve({
//       module: true,
//       jsnext: true,
//       main: true,
//       preferBuiltins: true,
//       browser: true,
//       modulesOnly: true,
//     }),
//     minify(),
//     sizeSnapshot(),
//     terser(),
//     commonjs(),
//     filesize(),
//   ],
// };

// export default config;
