/* eddited build process
   this file will build the theme for you! */

// import LESS plugins
const decomment = require('decomment');
const LessPluginCleanCSS = require('less-plugin-clean-css');


// define buildTools function
const buildTools = function(version) {
  this.build.ver = version;
};

// buildTools library
buildTools.prototype = {

  // files to build
  _theme: 'src/build/theme.less',
  _plugins: 'src/build/plugins.less',
  _pretty: 'src/build/pretty.less',
  _out: 'dist/theme.css',

  // define build data object
  build: {},

  // less plugin definition
  less: { plugins: [ new LessPluginCleanCSS() ] },


  // strip comments from string
  stripComments: decomment,

  // save compiled code to object
  saveFile: function (file) {
    let name = file[0].base.replace('.css', '');
    let data = file[0].data.toString();
    if (name == "pretty") data = this.stripComments(data);
    this.build[name] = data;
  },

  // format the outputted data into a single file
  joinFiles: function (file) {
    let core = file[0].data.toString();

    // define template for finale file
    let template = [
      `/* eddited options */`, this.build.pretty,
      `/* eddited plugins */`, this.build.plugins,
      `/* eddited core v${this.build.ver} */`, core
    ];

    // join template with new lines
    file[0].data = new Buffer(template.join('\n\n'));

    // export files
    return file;
  }

};

// export utilities
module.exports = buildTools;
