/* eslint-env node, es6 */
/* global require */
const {parallel, series, src, dest, watch} = require('gulp');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const { execSync } = require('child_process');


// /**
//  * Runs a command in the CLI and returns the output
//  * @link https://stackoverflow.com/a/12941186
//  * @param {string} command CLI command
//  * @param {function} callback Function to pickup command output
//  */
// const runCliCommand = (command, callback) => {
//   const stdout = execSync(command);
//   if (stdout) {
//     let output;
//     if (typeof stdout === 'string') {
//       output = stdout;
//     }
//     else if (typeof stdout.toString === 'function') {
//       output = stdout.toString();
//     }
//     else {
//       console.warn('Unable to get string value of command ouptut.', stdout);
//       return;
//     }
//     callback(output);
//   }
// };

/**********************************************************
 * JS build
 */

const buildJs = () => {
  return src('src/**/*.ts')
    .pipe(ts({
      "target": "ES2015",
      "module": "ES6",
      "strict": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "js"
    }))
    .pipe(dest('./'));
  // runCliCommand(
  //   'npm run tsc',
  //   (stdout) => {
  //     if (stdout) {
  //       console.log(stdout);
  //     }
  //   }
  // );
}

/**********************************************************
 * Browsersync
 */
/**
 * Start preview server for Adoc templates sample files
 */
const startBrowserSync = (done) => {
  browserSync.init({
    'server': './',
    'ui': false,
    'port': 2099,
    'ghostMode': {
      'scroll': false,
      'clicks': false,
      'location': false,
      'forms': false,
    }
  });
  done();
};

/**
 * Reload browser sync manually
 */
const reloadBrowserSync = (done) => {
  browserSync.reload();
  done();
};

const watchSrc = () => {
  watch(['css/*', 'css/**/*'], reloadBrowserSync)
  watch(['src/js/*', 'src/js/**/*'], series(buildJs, reloadBrowserSync));
}

exports.build = series(buildJs);

exports.start = series(
  buildJs,
  startBrowserSync,
  watchSrc
);

exports.default = exports.start;
