'use strict'

const { execSync } = require('child_process')
const path = require('path')

const through2 = require('through2')
const rimraf = require('rimraf')

const gulp = require('gulp')
// const eslint = require('gulp-eslint')
// const babel = require('gulp-babel')
const ts = require('gulp-typescript')

const webpack = require('webpack')

const cwd = process.cwd()

gulp.task(
  'copy',
  () => {
    return gulp.src(['./typings/*.ts'])
      .pipe(
        gulp.dest(process.cwd().replace(cwd, `${cwd}/dist/typings`))
      )
  }
)

gulp.task(
  'copyvue',
  () => {
    return gulp.src(['./packages/**/*.vue'])
      .pipe(
        gulp.dest(process.cwd().replace(cwd, `${cwd}/dist/packages`))
      )
  }
)

gulp.task(
  'copyicon',
  () => {
    return gulp.src(['./packages/**/icon/*.*'])
      .pipe(
        gulp.dest(process.cwd().replace(cwd, `${cwd}/dist/packages`))
      )
  }
)

gulp.task(
  'packages',
  () => {
    return gulp.src(['./packages/**/*.ts'])
      .pipe(
        ts(
          require('../../tsconfig.json')
        )
      )
      .pipe(
        gulp.dest(process.cwd().replace(cwd, `${cwd}/dist/packages`))
      )
  }
)

gulp.task(
  'utils',
  () => {
    return gulp.src(['./utils/*.ts', './utils/*.js'])
      .pipe(
        ts(
          require('../../tsconfig.json')
        )
      )
      .pipe(
        gulp.dest(process.cwd().replace(cwd, `${cwd}/dist/utils`))
      )
  }
)

gulp.task(
  'main',
  () => {
    return gulp.src(['*.ts'])
      .pipe(
        ts(
          require('../../tsconfig.json')
        )
      )
      .pipe(
        gulp.dest(process.cwd().replace(cwd, `${cwd}/dist`))
      )
  }
)


rimraf.sync(path.join(cwd, 'dist'))

gulp.task('default', ['copy', 'copyvue', 'packages', 'utils', 'main'])