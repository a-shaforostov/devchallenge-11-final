'use strict';

const gulp = require('gulp');
const environments = require('gulp-environments');
const development = environments.development;
const production = environments.production;

const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger');
const del = require('del');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');
const jsdoc = require("gulp-jsdoc3");
const sprite = require('gulp-sprite-generator');

const path = {
    build: {
        html: 'public/',
        js: 'public/js/',
        css: 'public/style/',
        spritesheet: 'public/images/',
        images: 'public/images/',
        img: '/images'
    },
    src: {
        html: 'src/*.html',
        js: ['src/js/**/*.js'],
        less: ['src/style/**/*.less'],
        sprite: ['src/style/sprites.css'],
        sprites: ['src/images/sprites/*.png'],
        img: ['src/images/*.*']
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        sprites_css: 'src/style/sprites.css',
        sprites_img: 'src/images/sprites/*.png',
        img: 'src/images/*.*'
    },
    clean: ['public/js', 'public/style', 'public/html.*', 'documentation-output', 'public/images'],
};

gulp.task('js:lint', () => {
    return gulp.src(path.src.js)
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
});

gulp.task('html:build', () => {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', () => {
    console.log(production() ? "production environment" : "development environment");
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(development(jsdoc({
            opts: {
                destination: './documentation-output',
                template: 'node_modules/jsdoc/templates/default'
            }
        })))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(production(uglify()))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', () => {
    const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});
    return gulp.src(path.src.less)
        .pipe(plumber())
        .pipe(development(sourcemaps.init()))
        .pipe(less({
            plugins: [cleanCSSPlugin]
        }).on('error', console.error))
        .pipe(development(sourcemaps.write('.')))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:sprites', function() {
    var spriteOutput;

    spriteOutput = gulp.src(path.src.sprite)
        .pipe(sprite({
            baseUrl:         path.src.sprites,
            spriteSheetName: "sprite.png",
            spriteSheetPath: path.build.img
        }));

    spriteOutput.css.pipe(gulp.dest(path.build.css));
    spriteOutput.img.pipe(gulp.dest(path.build.spritesheet));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем картинки
        .pipe(gulp.dest(path.build.images)); //И в build
});

gulp.task('clean', () => {
    return del(path.clean).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('watch', () => {
    watch([path.watch.html], () => {
        gulp.start('html:build');
    });
    watch([path.watch.style], () => {
        gulp.start('style:build');
    });
    watch([path.watch.js], () => {
        gulp.start('js:build');
    });
    watch([path.watch.sprites_css, path.watch.sprites_img], () => {
        gulp.start('image:sprites');
    });
    watch([path.watch.img], () => {
        gulp.start('image:build');
    });
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:sprites',
    'image:build'
]);

gulp.task('default', ['js:lint', 'build']);
