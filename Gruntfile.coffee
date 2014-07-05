module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig
    pkg: require './package.json'
    banner: [
      '/**',
      ' * <%= pkg.name %> - <%= pkg.version %>',
      ' *',
      ' * <%= pkg.description %>',
      ' *',
      ' * <%= pkg.author.url %>',
      ' *',
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;',
      ' * Licensed <%= pkg.license %>',
      ' */',
      ''
    ].join('\r\n')

    concat:
      options:
        banner: '<%= banner %>\r\n\r\n(function () {\r\n\r\n'
        footer: '\r\n\r\n})();'
      all:
        src: ['src/x-link.js']
        dest: 'dist/x-link.js'

    uglify:
      options:
        banner: '<%= banner %>'
      all:
        files:
          'dist/x-link.min.js': ['dist/x-link.js']

  grunt.registerTask 'default', ['concat', 'uglify']
