module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            'css/style.min.css': 'css/style.css' //to minify CSS
        },
        uglify:{
            'js/mainApp.min.js' : 'js/mainApp.js' //to minify JS
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['cssmin','uglify']);

};