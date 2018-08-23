'use strict'

const { execSync } = require('child_process')
const path = require('path')

const through2 = require('through2')
const rimraf = require('rimraf')

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')

const cwd = process.cwd()

console.log(cwd)
gulp.task(
  'vue',
  () => {
    return gulp.src(['./packages/**/*.ts', './utils/*.ts', '*.ts'])
      .pipe(
        ts(
          require('../../tsconfig.json')
        )
      )
      .pipe(
        gulp.dest(process.cwd())
      )
  }
)

rimraf.sync(path.join(cwd, 'dist'))

gulp.task('default', ['vue'])