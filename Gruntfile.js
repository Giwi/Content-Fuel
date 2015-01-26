'use strict';
module.exports = function (grunt) {
    // Project configuration.
    var root = 'public';
    var srcLib = root + '/js/libs';
    var srcApp = root + '/js/app';
    var tmp = '.tmp/templates';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc: {
            dist: {
                src: [srcApp + '/**/*.js', 'README.md'],
                options: {
                    destination: 'doc/jsdoc'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min',
                mangle: false
            },
            app: {
                src: '.tmp/concat/apps/**/*.js',
                dest: root + '/app/<%= pkg.name %>.min.js'
            },
            templates: {
                src: tmp + '/templates.js',
                dest: root + '/app/templates.min.js'
            }
        },
        html2js: {
            options: {
                base: root
            },
            main: {
                src: [root + '/templates/**/*.html'],
                dest: tmp + '/templates.js'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: '.tmp/jslibs',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            options: {
                node: true,
                smarttabs: true
            },
            all: ['Gruntfile.js', srcApp + '/**/*.js']
        },
        copy: {
            dist: {
                files: [{
                    src: root + '/index-template.html',
                    dest: root + '/index.html'
                }, {
                    expand: true,
                    src: srcLib + '/**/*.ttf',
                    dest: root + '/app/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    src: srcLib + '/**/*.woff',
                    dest: root + '/app/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    src: srcLib + '/**/*.eot',
                    dest: root + '/app/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    src: srcLib + '/**/images/*.*',
                    dest: root + '/app/images/',
                    flatten: true
                }]
            },
            dev: {
                files: [{
                    src: root + '/index.tmp',
                    dest: root + '/index.html'
                }]
            },
            prepare: {
                files: [{
                    src: root + '/index-template.html',
                    dest: root + '/index.tmp'
                }, {
                    src: root + '/index-template.html',
                    dest: root + '/index.html'
                }]
            }
        },
        wiredep: {
            target: {
                src: [root + '/index.tmp'],
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: ['angular-i18n'],
                fileTypes: {},
                ignorePath: '',
                overrides: {
                    "angular-file-uploader": {
                        "main": "angular-file-uploader.js"
                    },
                    'font-awesome': {
                        "main": "css/font-awesome.min.css"
                    }
                }
            }
        },
        useminPrepare: {
            options: {
                dest: root + '/app/'
            },
            html: root + '/index.tmp'
        },
        usemin: {
            html: root + '/index.html',
            options: {
                blockReplacements: {
                    js: function (block) {
                        return '<script src="app/' + block.dest + '"></script>\n';
                    },
                    css: function (block) {
                        return '<link rel="stylesheet" href="app/' + block.dest + '" />\n';
                    }
                }
            }
        },
        cssmin: {
            generated: {
                banner: '/* My minified css file */',
                keepSpecialComments: 0,
                root: root,
                target: {
                    files: {
                        'public/app/css.min.css': ['public/app/css.min.css']
                    }
                }
            }

        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [root + '/app/*.min.*']
                }]
            }
        },
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.html': root + '/index.html'
                }
            },
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: {
                    'public/index.html': root + '/index.html'
                }
            }
        },
        clean: [root + '/app/*', '.tmp', root + '/index.tmp'],
        ngAnnotate: {
            dist: {
                files: [{
                    expand: false,
                    src: srcApp + '/**/*.js',
                    dest: '.tmp/concat/apps/<%= pkg.name %>.js'
                }]
            }
        },
        plato: {
            quality: {
                files: {
                    'src/site/plato': [srcApp + '/**/*.js']
                }
            }
        },
        scriptlinker: {
            dev: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>\n',
                    appRoot: root + '/',
                    relative: true
                },
                files: {
                    'public/index.tmp': [srcApp + '/**/*.js']
                }
            },
            devcss: {
                options: {
                    startTag: '<!--CSS -->',
                    endTag: '<!--CSS END -->',
                    fileTmpl: '<link rel="stylesheet" href="%s" />\n',
                    appRoot: root + '/',
                    relative: true
                },
                files: {
                    'public/index.tmp': [root + '/css/**/*.css']

                }
            },
            prod: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>\n',
                    appRoot: root + '/',
                    relative: true
                },
                files: {
                    'public/index.html': [root + '/app/*.js']

                }
            },
            prodcss: {
                options: {
                    startTag: '<!--CSS -->',
                    endTag: '<!--CSS END -->',
                    fileTmpl: '<link rel="stylesheet" href="%s" />\n',
                    appRoot: root + '/',
                    relative: true
                },
                files: {
                    'public/index.html': [root + '/app/*.css']
                }
            }
        },
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                name: 'config'
            },
            // Environment targets
            development: {
                options: {
                    dest: srcApp + '/config.js'
                },
                constants: {
                    ENV: {
                        name: 'development',
                        apiEndPoint: 'http://localhost:8080',
                        useLoaderCache: false,
                        debugEnabled: true
                    }
                }
            },
            production: {
                options: {
                    dest: srcApp + '/config.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        apiEndPoint: '',
                        useLoaderCache: true,
                        debugEnabled: false
                    }
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-scriptlinker');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-ng-constant');

    // Default task(s).
    grunt.registerTask('prod', ['clean', 'ngconstant:production', 'copy:prepare', 'jshint', 'bower:install', 'scriptlinker',
        'wiredep', 'html2js', 'scriptlinker:dev', 'copy:dist', 'copy:dev', 'useminPrepare', 'concat:generated', 'cssmin:generated',
        'ngAnnotate', 'uglify:app', 'uglify:templates', 'rev', 'usemin:html', 'scriptlinker:prod',
        'scriptlinker:prodcss', 'htmlmin:prod']);
    grunt.registerTask('ci', ['jshint', 'bower:install', 'wiredep', 'scriptlinker:dev', 'copy']);
    grunt.registerTask('default', ['clean', 'ngconstant:development', 'copy:prepare', 'jshint',
        'bower:install', 'wiredep', 'scriptlinker:dev', 'scriptlinker:devcss', 'copy:dist', 'copy:dev', 'htmlmin:dev']);
};
