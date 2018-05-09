"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env['DEBUG'] = '*::INFO, *::WARN, *::ERR, *::SEVERE, *::';
process.env['DEBUG_COLORS'] = 'true';
process.env['DEBUG_STREAM'] = 'stdout';
var debugsx = require("debug-sx");
var path = require("path");
var server_1 = require("./server");
var date = new Date();
exports.log = debugsx.createFullLogger('main');
var consolelogger = debugsx.createConsoleHandler('stdout', '*::INFO, *::FINE, *::SEVERE, *::ERR, *::WARN', '-*', [
    { level: 'INFO', color: 'cyan', inverse: true },
    { level: 'FINE', color: 'white', inverse: true },
    { level: 'SEVERE', color: 'red', inverse: true },
    { level: 'ERR', color: 'red', inverse: true },
    { level: 'WARN', color: 'magenta', inverse: true }
]);
var filelogger;
filelogger = debugsx.createFileHandler(path.join(__dirname, '..', 'log', 'server_' + date.toLocaleDateString() + '_' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds() + '.log'), '*::INFO, *::FINE, *::SEVERE, *::ERR, *::WARN', '-*', [
    { level: 'INFO', color: 'cyan', inverse: true },
    { level: 'FINE', color: 'white', inverse: true },
    { level: 'SEVERE', color: 'red', inverse: true },
    { level: 'ERR', color: 'red', inverse: true },
    { level: 'WARN', color: 'magenta', inverse: true }
]);
debugsx.addHandler(consolelogger, filelogger);
var port = 88;
var Main = (function () {
    function Main() {
    }
    Main.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                server_1.Server.Instance.start(port).catch(function (err) {
                    exports.log.severe(err);
                    process.exit();
                });
                return [2];
            });
        });
    };
    return Main;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    m = new Main();
                    return [4, m.init()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
main();

//# sourceMappingURL=main.js.map
