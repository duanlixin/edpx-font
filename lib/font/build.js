/**
 * @file 图片转成字体入口
 * @author duanlixin[duanlixin@gmail.com]
 */

var log = require( '../log' );
var fs = require( 'fs' );
var path = require( '../util/path' );

/**
 * 命令行配置项
 * 
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令名称
 * 
 * @type {string}
 */
cli.command = 'build';

/**
 * 命令描述信息
 * 
 * @type {string}
 */
cli.description = '项目构建';

/**
 * 命令选项信息
 *
 * @type {Array}
 */
cli.options = [
    'output:',
    'config:',
    'force'
];

/**
 * 模块执行入口
 * 
 * @param {Array.<string>} args 命令行参数
 * @param {Object.<string, string>} opts 命令可选参数
 */
cli.main = function ( args, opts ) {

    var conf = require( '../util/handle-cli' )( args, opts, 'image' );
    var imageDir = conf.image;
    var files = fs.readdirSync( imageDir );
    if( files.length == 0 ) {
        log( '请在image目录中放入图片' );
        return;
    }
    var cssDir = conf.css;
    // 1. 默认直接抛出异常，防止项目构建输出影响和覆盖原有文件
    // 2. 如果设置了force参数，强制删除当前存在的目录
    if ( fs.existsSync( cssDir ) ) {
        if ( opts.force ) {
            require( '../util/rmdir' )( cssDir );
        }
        else {
            log.warn( cssDir + ' directory already exists!' );
            return;
        }
    }
    require( '../util/build-font' )( conf );
};

/**
 * 命令行配置项
 * 
 * @type {Object}
 */
exports.cli = cli;
