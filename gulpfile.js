const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const babelify = require('babelify');
const sourcemaps = require('gulp-sourcemaps');



function stylesModify () {
    return gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
}
function pugModify () {
    return gulp.src('./app/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
}

function oversee () {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch('./app/sass/**/*.sass',stylesModify);
    gulp.watch('./app/pug/**/*.pug',pugModify);
    gulp.watch('./app/js/**./.js', scriptModify)
    gulp.watch('app/*.html').on('change', browserSync.reload);
}

function scriptModify () {
    return browserify('app/js/main.js',{debug:true}).transform(babelify, {
        presets: [ '@babel/preset-env' ],
        plugins: [ '@babel/transform-runtime' ],
        sourceMaps: true
    }).bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }));
}

gulp.task('build',gulp.parallel(pugModify,stylesModify,scriptModify));
gulp.task('dev',gulp.series('build',oversee));
gulp.task('pug',pugModify);
gulp.task('script',scriptModify);
gulp.task('style',stylesModify);
gulp.task('test',()=>{
    console.log('TEST!')
})