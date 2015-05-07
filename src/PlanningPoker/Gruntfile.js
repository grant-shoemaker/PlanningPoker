/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    var typescriptConfig = {
        files: {
            src: ["scripts/**/*ts"],
            dest: "wwwroot"
        }
    };

    grunt.initConfig({
        typescript: typescriptConfig
    });

    grunt.loadNpmTasks("grunt-typescript");
};