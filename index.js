"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs = __importStar(require("fs"));
var discord_js_1 = require("discord.js");
var builders_1 = require("@discordjs/builders");
var node_path_1 = require("node:path");
var _ = require("lodash");
var apiUrl = "https://discordstatus.com/api/v2/incidents.json";
var cacheFileName = (0, node_path_1.join)(__dirname, "assets/messages.json");
console.log({ apiUrl: apiUrl, cacheFileName: cacheFileName });
var ignoreDays = 3;
var ignoreTime = ignoreDays * 86400000;
console.log("Ignoring incidents from ".concat(ignoreDays, " days ago (").concat(ignoreTime, " ms)."));
var webhookClient = new discord_js_1.WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });
/**
 * Checks if a message exists for the given incident. If so, the message will be updated, if there are new updates to
 * the given incident. If there is no message for the given incident, this method will create a new one.
 * @param incident - The incident to check
 */
function checkIncident(incident) {
    return __awaiter(this, void 0, void 0, function () {
        var id, incidentUpdate, messageId, message, e_1, messageUpdate, diff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = incident.id;
                    incidentUpdate = Date.parse(incident.updated_at);
                    // check if update is too old
                    if (Date.now() - incidentUpdate > ignoreTime) {
                        console.debug("Skipping update of incident ".concat(id, " because it's too old."));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getMessageIdOfIncident(id)];
                case 1:
                    messageId = _a.sent();
                    if (!(messageId === undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, createMessage(incident)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
                case 3:
                    message = undefined;
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 9]);
                    return [4 /*yield*/, webhookClient.fetchMessage(messageId)];
                case 5:
                    message = _a.sent();
                    return [3 /*break*/, 9];
                case 6:
                    e_1 = _a.sent();
                    if (!(e_1 === discord_js_1.DiscordAPIError)) return [3 /*break*/, 8];
                    return [4 /*yield*/, createMessage(incident)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
                case 8: return [3 /*break*/, 9];
                case 9:
                    if (!(message === undefined)) return [3 /*break*/, 11];
                    return [4 /*yield*/, createMessage(incident)];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
                case 11:
                    if (!(message.embeds.length > 0)) return [3 /*break*/, 14];
                    messageUpdate = Date.parse(message.embeds[0].timestamp);
                    diff = messageUpdate - incidentUpdate;
                    if (!(diff !== 0)) return [3 /*break*/, 13];
                    return [4 /*yield*/, updateMessage(message, incident)];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
                case 13: return [3 /*break*/, 16];
                case 14: 
                // message contains no embeds - update message
                return [4 /*yield*/, updateMessage(message, incident)];
                case 15:
                    // message contains no embeds - update message
                    _a.sent();
                    _a.label = 16;
                case 16: return [2 /*return*/];
            }
        });
    });
}
/**
 * Creates a new EmbedMessage containing the information about the given incident.
 * @param incident
 * @return {MessageEmbed} - the newly constructed EmbedMessage
 */
function buildIncidentEmbed(incident) {
    var embed = new discord_js_1.MessageEmbed()
        .setTitle(incident.name)
        .setURL(incident.shortlink)
        .setColor(getStatusColor(incident.status))
        .setFooter(incident.id)
        .setTimestamp(incident.updated_at);
    // collect affected components
    var components = [];
    for (var i in incident.components) {
        var component = incident.components[i];
        components.push(component.name);
    }
    embed.setDescription("\u2022 Impact: ".concat(incident.impact, "\n\u2022 Affected Components: ").concat(components.join(", ")));
    // collect incident updates
    for (var i in incident.incident_updates) {
        var update = incident.incident_updates[i];
        var timeString = " (" + (0, builders_1.time)(new Date(update.created_at), "R") + ")";
        embed.addField(_.startCase(update.status) + timeString, update.body, false);
    }
    embed.fields.reverse();
    return embed;
}
/**
 * Creates a new message with the information about the given incident and stores the message id into the
 * cache file.
 * @param incident - The incident the message should represent
 */
function createMessage(incident) {
    return __awaiter(this, void 0, void 0, function () {
        var id, json, messageId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = incident.id;
                    return [4 /*yield*/, readMessagesFile()];
                case 1:
                    json = _a.sent();
                    return [4 /*yield*/, sendIncident(incident)];
                case 2:
                    messageId = _a.sent();
                    json[id] = messageId;
                    console.log("Created new message for incident ".concat(id, " with message-id ").concat(messageId, "."));
                    fs.writeFileSync(cacheFileName, JSON.stringify(json, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Updates a given message with new information about the given incident.
 * @param message - The message to update
 * @param incident - The incident the message contains
 */
function updateMessage(message, incident) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = incident.id;
                    console.log("Updating message of incident ".concat(id, "."));
                    return [4 /*yield*/, webhookClient.editMessage(message, {
                            embeds: [buildIncidentEmbed(incident)]
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Runs the checks for updated incidents.
 */
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var obj, incidents, _a, _b, _c, _i, i, incident, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fetchIncidents()];
                case 1:
                    obj = _d.sent();
                    incidents = obj.incidents.reverse();
                    _a = incidents;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 7];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 6];
                    i = _c;
                    incident = incidents[i];
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, checkIncident(incident)];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _d.sent();
                    console.error("Could not check incident.", e_2);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**
 * Sends a new message with the information of the given incident.
 * @param incident - The incident the message should represent
 * @return {String} id - The id of the newly created message
 */
function sendIncident(incident) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webhookClient.send({
                        embeds: [buildIncidentEmbed(incident)]
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.id];
            }
        });
    });
}
/**
 * Checks if the message cache file exists. If not it will create a new one.
 */
function checkFile() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fs.existsSync(cacheFileName))
                return [2 /*return*/];
            fs.writeFileSync(cacheFileName, JSON.stringify({}));
            return [2 /*return*/];
        });
    });
}
/**
 * Reads the message cache file and returns its contents as json.
 */
function readMessagesFile() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = fs.readFileSync(cacheFileName, "utf-8");
            return [2 /*return*/, JSON.parse(data)];
        });
    });
}
/**
 * Finds the message id of the incident message, stored in the cache file.
 * @param {String} id - The id of an incident
 * @return {String | undefined} - The message id or undefined if it was not cached
 */
function getMessageIdOfIncident(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readMessagesFile()];
                case 1: return [2 /*return*/, (_a.sent())[id]];
            }
        });
    });
}
/**
 * Fetches the discord-status api and returns the result as json.
 */
function fetchIncidents() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1["default"])(apiUrl)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Gets a color for the status of an incident.
 * @param {String} status - The status of an incident
 * @return {ColorResolvable} color - The color corresponding to the given status
 */
function getStatusColor(status) {
    switch (status) {
        case "resolved": return "#06a51b";
        case "monitoring": return "#a3a506";
        case "identified": return "#a55806";
    }
    return "#a50626";
}
// check if the message cache file exists, then start the program
checkFile().then(function () { return start().then(function () { return console.log("Done."); })["catch"](console.error); })["catch"](console.error);
