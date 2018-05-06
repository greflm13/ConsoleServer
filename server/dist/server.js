"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
var http = require("http");
var child = require("child_process");
var main_1 = require("./main");
var Server = (function () {
    function Server() {
        var _this = this;
        this._express = express();
        this._express.use(bodyparser.json());
        this._express.use(bodyparser.urlencoded({ extended: true }));
        this._express.use(this.logger);
        this._express.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
        this._express.use(express.static(path.join(__dirname, '../../ngx/dist')));
        this._express.post('/api/command', function (req, res, next) {
            return _this.console(req, res, next);
        });
        this._express.get('/api/path', function (req, res, next) { return _this.path(req, res, next); });
        this._express.use(function (req, res, next) { return _this.error404Handler(req, res, next); });
        this._express.use(function (err, req, res, next) {
            return _this.errorHandler(err, req, res, next);
        });
    }
    Object.defineProperty(Server, "Instance", {
        get: function () {
            if (Server._instance === undefined) {
                Server._instance = new Server();
            }
            return Server._instance;
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.console = function (req, res, next) {
        var pat = path.dirname(__dirname);
        child.exec(req.body.command, function (error, stdout, stderr) {
            if (stdout !== '') {
                main_1.log.info(stdout);
                res.send(JSON.stringify(pat + ': ' + stdout));
            }
            if (stderr !== '') {
                main_1.log.warn(stderr);
                res.send(JSON.stringify(pat + ': ' + stderr));
            }
        });
    };
    Server.prototype.path = function (req, res, next) {
        var pat = path.dirname(__dirname);
        res.send(JSON.stringify(pat));
    };
    Server.prototype.error404Handler = function (req, res, next) {
        var clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
        main_1.log.warn('Error 404 for %s %s from %s', req.method, req.url, clientSocket);
        res.status(404).sendFile(path.join(__dirname, 'views/error404.html'));
    };
    Server.prototype.errorHandler = function (err, req, res, next) {
        var ts = new Date().toLocaleString();
        main_1.log.warn('Error %s\n%e', ts, err);
    };
    Server.prototype.logger = function (req, res, next) {
        var clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
        main_1.log.info(req.method, req.url, clientSocket);
        next();
    };
    Server.prototype.start = function (port) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var server = http.createServer(_this._express).listen(port, function () {
                main_1.log.info('Server running on port ' + port);
                server.on('close', function () {
                    main_1.log.fine('Server stopped.');
                });
                server.on('err', function (err) {
                    main_1.log.warn(err);
                });
            });
        });
    };
    return Server;
}());
exports.Server = Server;

//# sourceMappingURL=server.js.map
