var gulp = require('gulp'),
  ngAnnotate = require('gulp-ng-annotate'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  runSequence = require('run-sequence'),
  babel = require('gulp-babel')

var $ = require('gulp-load-plugins')()
var rename = require("gulp-rename")

var url = require('url')
var proxy = require('proxy-middleware')

var replace = require('gulp-string-replace')


gulp.task('inject', function () {
  // var injectStyles = gulp.src([
  //   path.join(conf.paths.src, '/app/**/*.css')
  // ], { read: false });

  var injectScripts = gulp.src([
    './src/app/**/*.js',
    '!./src/app/**/*.spec.js',
    '!./src/app/**/*.mock.js'
  ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe($.angularFilesort())

  var injectOptions = {
    // addRootSlash: false
  }
  console.log(injectScripts)
  return gulp.src('./starter.html')
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(rename(function (path) {
      // path.basename += "";
      path.extname = ".dev.html"
    }))
    .pipe(gulp.dest('./'))
})

// 优化图片
gulp.task('images', function () {
  return gulp.src('./imgs/**/*').pipe($.changed('./_build/imgs')).// pipe($.imagemin({
  //   optimizationLevel: 3,
  //   progressive: true,
  //   interlaced: true
  // })).
  pipe(gulp.dest('./_build/imgs'))
})

// 复制无需编译文件
gulp.task('copy', function (callback) {
  runSequence(
    'copy:i18n',
    'copy:theme',
    'copy:ico',
    // 'copy:html',
    callback)
})
// 复制多语言文件夹
gulp.task('copy:i18n', function () {
  return gulp.src('./i18n/**/*').pipe($.changed('./_build/i18n')).pipe(gulp.dest('./_build/i18n'))
})
// 复制主题文件夹
gulp.task('copy:theme', function () {
  return gulp.src('./theme/**/*').pipe($.changed('./_build/theme')).pipe(gulp.dest('./_build/theme'))
})
// 复制icon
gulp.task('copy:ico', function () {
  return gulp.src([
    './favicon.ico',
    './config.js',
    './plugins/ace/mode-sql.js',
    './plugins/ace/mode-html.js',
    './plugins/ace/mode-ftl.js',
    './plugins/ace/mode-javascript.js'
    // './china.json',
    // './chinaZone.json'
  ]).pipe($.changed('./_build/'))
    .pipe(gulp.dest('./_build/'))
})
// 复制html
gulp.task('copy:html', function () {
  return gulp.src([
    './**/*.html',
    '!./*.html',
    '!./theme/**/*.html',
    '!./plugins/**/*.html',
    '!./wordPlugin/**/*.html',
    '!bower_components/**/*.*',
    '!node_modules/**/*.*',
    '!_build/**/*.*',
    '!./src/app/**'
  ]).pipe($.changed('./_build/')).pipe(gulp.dest('./_build/'))
})

gulp.task('browser-sync', function () {
  // var proxyOptions = url.parse('http://localhost:3000/api')
  // proxyOptions.route = '/api'
  // requests to `/api/x/y/z` are proxied to `http://localhost:3000/secret-api`
  browserSync({
    // open: true,
    port: 4000,
    ghostMode: false,
    server: {
      baseDir: './'
      // middleware: [proxy(proxyOptions)]
    }
  })
})

// 压缩JS
gulp.task('minify-js', function () {
  gulp.src(['lib/**/*.js', '!lib/**/*.min.js']).pipe($.uglify()).pipe($.rename({suffix: '.min'})).pipe(gulp.dest('lib/'))
  gulp.src(['plugins/**/*.js', '!plugins/**/*.min.js']).pipe($.uglify()).pipe($.rename({suffix: '.min'})).pipe(gulp.dest('plugins/'))
})

gulp.task('minify-js:all_libs', function (callback) {
  runSequence(
    'minify-js:plugins',
    'minify-js:libs',
    callback)
})

gulp.task('minify-js:libs', function () {
  return gulp.src(['lib/**/*.js', '!lib/**/*.min.js'])
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./lib/'))
})

gulp.task('minify-js:plugins', function () {
  return gulp.src(['plugins/**/*.js', '!plugins/**/*.min.js'])
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('plugins/'))
})

// 压缩CSS
gulp.task('minify-css', function () {
  gulp.src(['./css/**/*.css', '!./css/**/*.min.css']).pipe($.rename({suffix: '.min'})).pipe($.minifyCss({keepBreaks: true})).// pipe(gulp.dest('./css/')).
  pipe(gulp.dest('./_build/css/'))
})

// 压缩HTML
gulp.task('minify-html', function () {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  }

  gulp.src('./starter.html').pipe($.minifyHtml(opts)).pipe(gulp.dest('./_build/'))
})

// 复制字体
gulp.task('fonts', function (cb) {
  gulp.src('./fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
    .pipe($.changed('./_build/fonts'))
    .pipe(gulp.dest('./_build/fonts'))
  gulp.src(["./_build/css/style.css"]) // Any file globs are supported
    .pipe(replace('../../fonts', '../fonts'))
    .pipe(gulp.dest('./_build/css/'))
  gulp.src(["./_build/css/style_preview.css"]) // Any file globs are supported
    .pipe(replace('../../fonts', '../fonts'))
    .pipe(gulp.dest('./_build/css/'))
  // del([
  //   './_build/css/style.css'
  // ], cb)
  // gulp.src(["./_build/css/style.temp.css"]) // Any file globs are supported
  //   .pipe(gulp.dest('./_build/css/style.css'))
  // del([
  //   './_build/css/style.temp.css'
  // ], cb)

})

// 网络服务器
gulp.task('server', ['inject'], function (done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done)
})

// 网络服务器(_build目录)
gulp.task('server-build', function (done) {
  return browserSync({
    server: {
      baseDir: './_build/'
    }
  }, done)
})

// 删除build目录
gulp.task('clean:build', function (cb) {
  del([
    './_build/'
  ], cb)
})

// 链接文件
gulp.task('concat', function () {
  gulp.src('./src/*.js').pipe(babel({
    presets: ['es2015']
  })).pipe($.concat('scripts.js')).pipe(gulp.dest('./_build/'))
})

// sass
gulp.task('sass', function () {
  return gulp.src('styles/style.scss').pipe($.sourcemaps.init()).pipe($.sass({
    style: 'expanded'
  })).on('error', $.notify.onError({
    title: 'SASS Failed',
    message: 'Error(s) occurred during compile!'
  })).pipe($.sourcemaps.write()).pipe(gulp.dest('styles')).pipe(reload({
    stream: true
  })).pipe($.notify({
    message: 'Styles task complete'
  }))
})

// 编译sass
gulp.task('sass:build', function () {
  var s = $.size()

  return gulp.src('styles/style.scss').pipe($.sass({
    style: 'compact'
  })).pipe($.autoprefixer('last 3 version')).pipe($.uncss({
    html: ['./index.html', './views/**/*.html', './components/**/*.html'],
    ignore: [
      '.index',
      '.slick',
      /\.owl+/,
      /\.owl-next/,
      /\.owl-prev/
    ]
  })).pipe($.minifyCss({
    keepBreaks: true,
    aggressiveMerging: false,
    advanced: false
  })).pipe($.rename({suffix: '.min'})).pipe(gulp.dest('_build/css')).pipe(s).pipe($.notify({
    onLast: true,
    message: function () {
      return 'Total CSS size ' + s.prettySize
    }
  }))
})

require('events').EventEmitter.prototype._maxListeners = 100

// 编译index.html
// 链接script/css
gulp.task('usemin', function (callback) {
  runSequence(
    'usemin:starter',
    'usemin:preview',
    'usemin:other',
    callback)
})
gulp.task('usemin:starter', function () {
  return usemin(['./starter.html'])
})
gulp.task('usemin:preview', function () {
  return usemin_preview(['./preview2.html'])
})
gulp.task('usemin:other', function () {
  return usemin(['./home.html', './preview.html', './login.html', './index.html', './screen.html'])
})

function usemin_preview(src) {
  return gulp.src(src)
    .pipe($.htmlReplace({
      'replace_style': '<link rel="stylesheet" href="css/style.css"/>',
      'replace_jquery': '<script src="js/jquery.js"></script>'
    }))
    .pipe($.usemin({
      css: [$.minifyCss(), 'concat'],
      libs: [],
      // libs_min: [],
      app: [babel({
        presets: ['es2015'],
        compact: false,
        "plugins": ["transform-remove-strict-mode"]
      }), ngAnnotate, $.uglify()]
    }))
    .pipe(gulp.dest('./_build/'))
}

function usemin(src) {
  return gulp.src(src)
  // add templates path
    .pipe($.htmlReplace({
      'templates': '<script type="text/javascript" src="js/templates.js"></script>',
      'replace_style': '<link rel="stylesheet" href="css/style.css"/>',
      'replace_jquery': '<script src="js/jquery.js"></script>',
      'replace_libs': '<script src="js/libs.js"></script>',
      'replace_app': '<script src="js/app.js"></script>',
      // 'replace_defaultEventService': '<script src="js/defaultEventService.js"></script>',
      // 'replace_webSocketEventService': '<script src="js/webSocketEventService.js"></script>'
    })).pipe($.usemin({
      css: [$.minifyCss(), 'concat'],
      screencss: [$.minifyCss(), 'concat'],
      libs: [],
      screen: [],
      app: [babel({
        presets: ['es2015'],
        compact: false,
        "plugins": ["transform-remove-strict-mode"]
      }), ngAnnotate, $.uglify()],
      event: [ngAnnotate, $.uglify()]
    })).pipe(gulp.dest('./_build/'))
}

// templateCache
gulp.task('templates', function () {
  return gulp.src([
    './**/*.html',
    '!./*.html',
    '!./theme/**/*.html',
    '!./plugins/**/*.html',
    '!./wordPlugin/**/*.html',
    '!bower_components/**/*.*',
    '!node_modules/**/*.*',
    '!_build/**/*.*'
  ]).pipe($.minifyHtml()).pipe($.angularTemplatecache({
    module: 'discovery'
  })).pipe(gulp.dest('_build/js'))
})

gulp.task('templates_preview', function () {
  return gulp.src([
    './src/view/nv/dashboard/view.html',
    './src/view/nv/dashboard/layout/dnd.html',
    './src/view/nv/dashboard/param/selector.html'
  ]).pipe($.minifyHtml()).pipe($.angularTemplatecache({
    module: 'discovery',
    transformUrl: function (url) {
      if (url === 'view.html')
        return 'src/view/nv/dashboard/view.html'
      else if (url === 'dnd.html')
        return 'src/view/nv/dashboard/layout/dnd.html'
      else if (url === 'selector.html')
        return 'src/view/nv/dashboard/param/selector.html'
    },
    filename: 'templates_preview.js'
  })).pipe(gulp.dest('_build/js'))
})

// reload
gulp.task('bs-reload', function () {
  browserSync.reload()
})

// 统计大小
gulp.task('build:size', function () {
  var s = $.size()

  return gulp.src('./_build/**/*.*').pipe(s).pipe($.notify({
    onLast: true,
    message: function () {
      return '编译后' + s.prettySize
    }
  }))
})

// 启动服务器并监控文件
gulp.task('default', ['inject', 'browser-sync'], function () {
  // gulp.task('default', ['browser-sync', 'sass', 'minifimagesy-css'], function() {
  gulp.watch('css/*.css', function (file) {
    if (file.type === 'changed') {
      reload(file.path)
    }
  })
  gulp.watch(['*.html', 'src/**/*.html', 'theme/**/*.html'], ['bs-reload'])
  gulp.watch(['app/*.js', 'src/**/*.js', 'theme/**/*.js'], ['bs-reload'])
  // gulp.watch('styles/**/*.scss', ['sass', 'minify-css'])
})

gulp.task('build', function (callback) {
  runSequence(
    'clean:build',
    'copy',
    // 'sass:build',
    'images',
    'templates',
    'templates_preview',
    'usemin',
    'fonts',
    'build:size',
    callback)
})
