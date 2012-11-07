module.exports = function(grunt) {
  grunt.initConfig({
    info: '<json:package.json>',
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/'
    },
    lint: {
      all: ['grunt.js', 'package.json', 'component.json', 'lib/*.js', 'test/*.test.js']
    },
    clientside: {
      main: {
        main: 'lib/thrive.js',
        name: 'Thrive',
        output: 'dist/thrive.js'
      }
    },
    concat: {
      dist: {
        src: ['<banner>', 'dist/thrive.js'],
        dest: 'dist/thrive.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/thrive.js'],
        dest: 'dist/thrive.min.js'
      }
    },
    simplemocha: {
      all: {
        src: 'test/**/*.test.js',
        options: {
          ui: 'tdd',
          reporter: 'list',
          growl: true
        }
      }
    },
    watch: {
      js: {
        files: '<config:lint.all>',
        tasks: 'default' 
      }
    },
    server:{
      port: 8000,
      base: '.'
    }
  });
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-clientside');
  grunt.registerTask('default', 'lint clientside concat min simplemocha');
  grunt.registerTask('dev', 'default server watch');
};
