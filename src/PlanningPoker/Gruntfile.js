/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    var bowerConfig = {
        install: {
            options: {
                targetDir: "wwwroot/lib",
                layout: "byComponent",
                cleanTargetDir: true
            }
        },
        setupDevDt: {
            options: {
                targetDir: "scripts",
                cleanTargetDir: false
            }
        }
    };

    var typescriptConfig = {
        base: {
            src: ["scripts/**/*ts"],
            dest: "wwwroot",
            options: {
                module: 'amd',
                target: 'es5',
                sourceMap: true,
                declaration: true
            }
        }
    };

    grunt.initConfig({
        bower: bowerConfig,
        typescript: typescriptConfig
    });

    grunt.registerTask("default", ["bower:install", "bower:setupDevDt", "typescript:base"]);

    grunt.loadNpmTasks("grunt-bower-task");

    grunt.loadNpmTasks("grunt-typescript");
};