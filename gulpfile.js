const gulp = require( "gulp" );
const htmlMin = require( "gulp-htmlmin" );
const less = require( "gulp-less" );
const concatCss = require( "gulp-concat-css" );
const cssMin = require( "gulp-cssmin" );
const rename = require( "gulp-rename" );
const jsMin = require( "gulp-jsmin" );
const LessAutoPreFix = require( "less-plugin-autoprefix" );
const autoPreFix = new LessAutoPreFix( { browsers: [ "last 3 versions" ] } );
const browserSync = require( "browser-sync" ).create();
const dest = "docs";

gulp.task( "html", () => {
    return gulp.src( "src/*.html" )
        .pipe( htmlMin( { collapseWhitespace: true } ) )
        .pipe( gulp.dest( dest ) );
} );

// собирает все файлы less в один css, минифицирует его и добавляет .min к названию.
gulp.task( "less", () => {
    return gulp.src( "./src/Styles/index.less" )
        .pipe( less( {
            plugins: [ autoPreFix ]
        } ) )
        .pipe( concatCss( "index.css" ) )
        .pipe( cssMin() )
        .pipe( rename( { suffix: ".min" } ) )
        .pipe( gulp.dest( "docs/Styles" ) );
} );
gulp.task( "lessTwo", () => {
    return gulp.src( "./src/Styles/form.less" )
        .pipe( less( {
            plugins: [ autoPreFix ]
        } ) )
        .pipe( concatCss( "form.css" ) )
        .pipe( cssMin() )
        .pipe( rename( { suffix: ".min" } ) )
        .pipe( gulp.dest( "docs/Styles" ) );
} );

gulp.task( "lessThree", () => {
    return gulp.src( "./src/Styles/choice.less" )
        .pipe( less( {
            plugins: [ autoPreFix ]
        } ) )
        .pipe( concatCss( "choice.css" ) )
        .pipe( cssMin() )
        .pipe( rename( { suffix: ".min" } ) )
        .pipe( gulp.dest( "docs/Styles" ) );
} );
gulp.task( "lessFour", () => {
    return gulp.src( "./src/Styles/test.less" )
        .pipe( less( {
            plugins: [ autoPreFix ]
        } ) )
        .pipe( concatCss( "test.css" ) )
        .pipe( cssMin() )
        .pipe( rename( { suffix: ".min" } ) )
        .pipe( gulp.dest( "docs/Styles" ) );
} );
gulp.task( "lessFive", () => {
    return gulp.src( "./src/Styles/result.less" )
        .pipe( less( {
            plugins: [ autoPreFix ]
        } ) )
        .pipe( concatCss( "result.css" ) )
        .pipe( cssMin() )
        .pipe( rename( { suffix: ".min" } ) )
        .pipe( gulp.dest( "docs/Styles" ) );
} );

gulp.task( "jsMin", () => {
    return gulp.src( "src/JS/*.js" )
        .pipe( jsMin() )
        .pipe( rename( { suffix: ".min" } ) )
        .pipe( gulp.dest( "docs/JS" ) );
} );

// запускает страничку, следит за изменениями в файлах и перезагружает сайт

gulp.task( "browser-sync", function () {
    browserSync.init( {
        server: {
            baseDir: "docs",
            port: 3000
        }
    } );

    gulp.watch( [ "src/*.html", "src/Styles/*.less", "src/JS/*.js" ] ).on( "change", browserSync.reload );
} );


gulp.task( "watch", () => {
    gulp.watch( "src/*.html" ).on( "change", gulp.parallel( "html" ) );
    gulp.watch( "src/JS/*.js" ).on( "change", gulp.parallel( "jsMin" ) );
    gulp.watch( "src/Styles/*.less" ).on( "change", gulp.parallel( ["lessFive","less","lessTwo","lessThree","lessFour"] ) );

} );

gulp.task( "default", gulp.parallel(
    "browser-sync",
    "watch",
) );


// /нужен jsб autoprefixer минификация и сжатие изображений