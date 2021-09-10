let projectFolder = require("path").basename(__dirname);
let sourceFolder = "#src";

let fs = require('fs');

let path = {
    build:{
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        images: projectFolder + "/images/",
        fonts: projectFolder + "/fonts/",
    },
    src:{
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/scss/style.scss",
        cssLib: sourceFolder + "/scss/lib/**/*.css",
        js: sourceFolder + "/js/*.js",
        jsLib: sourceFolder + "/js/lib/**/*.js",
        images: sourceFolder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/fonts/*.ttf",
    },
    watch:{
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.{scss,css}",
        js: sourceFolder + "/js/**/*.js",
        images: sourceFolder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/"
}

let { src, dest } = require("gulp"),
    gulp = require("gulp"), 
    browser_sync = require("browser-sync").create(),
    file_include = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webp-css"),
    svg_sprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter");

function browserSync(params){
    browser_sync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        browser: ["chrome.exe"],
        port: 3000,
        notify: false
    })
}

function html(){
    return src(path.src.html)
        .pipe(file_include())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browser_sync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp'
        }))
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browser_sync.stream())
}

function cssLib(){
    return src(path.src.cssLib)
        .pipe(concat("all.css"))
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(dest(path.build.css))
        .pipe(browser_sync.stream())
}


function js(){
    return src(path.src.js)
        .pipe(file_include())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browser_sync.stream())
}

function jsLib(){
    return src(path.src.jsLib)
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browser_sync.stream())
}


function images(){
    return src(path.src.images)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(imagemin({
            progressive: true,
            svgPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.images))
        .pipe(browser_sync.stream())
}

function fonts(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function() {
    return src([sourceFolder + '/fonts/*.otf'])
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(sourceFolder + '/fonts/'))
});

gulp.task('svg_sprite', function() {
    return gulp.src([sourceFolder + '/iconsprite/*.svg'])
        .pipe(svg_sprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                }
            }
        }))
        .pipe(dest(path.build.images))
});


gulp.task("swiperCss", function(){
    return gulp.src(["node_modules/swiper/swiper-bundle.min.css"])
    .pipe(gulp.dest(sourceFolder + '/scss/lib'));
    });

gulp.task("swiperJs", function(){
    return gulp.src(["node_modules/swiper/swiper-bundle.min.js"])
    .pipe(gulp.dest(sourceFolder + '/js/lib'));
    });

gulp.task("swiper", gulp.parallel("swiperCss", "swiperJs"));

gulp.task("simpleBarCss", function(){
    return gulp.src(["node_modules/simplebar/dist/simplebar.min.css"])
    .pipe(gulp.dest(sourceFolder + '/scss/lib'));
    });

gulp.task("simpleBarJs", function(){
    return gulp.src(["node_modules/simplebar/dist/simplebar.min.js"])
    .pipe(gulp.dest(sourceFolder + '/js/lib'));
    });

gulp.task("simplebar", gulp.parallel("simpleBarCss", "simpleBarJs"));


function fontsStyle(){
    let file_content = fs.readFileSync(sourceFolder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(sourceFolder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (let i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb(){

}

function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}

function clean(){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, jsLib, css, cssLib, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.jsLib = jsLib;
exports.css = css;
exports.cssLib = cssLib;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;