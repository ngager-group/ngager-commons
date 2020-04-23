/* eslint-disable */
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import multiInput from 'rollup-plugin-multi-input'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: [
    'src/index.js',
    'src/CircularProgress/index.js',
    'src/ConfirmationDialog/index.js',
    'src/NgagerButton/index.js',
    'src/NgagerErrorMessage/index.js',
    'src/NgagerGroupButtons/index.js',
    'src/NgagerIconButton/index.js',
    'src/NgagerSearchField/index.js',
    'src/NgagerSelectField/index.js',
    'src/NgagerTreeView/index.js',
    'src/eventListener/index.js',
    'src/MockApi/index.js',
    'src/NgagerAvatar/index.js',
    'src/SortableList/index.js',
    'src/SmartObject/index.js'
  ],
  output: {
    format: 'esm',
    dir: 'dist'
  },
  plugins: [
    multiInput({ relative: 'src/' }),
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ '@babel/external-helpers', '@babel/plugin-proposal-class-properties' ]
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType']
      }
    })
  ]
}
