var express = require('express');
var app = express();

const BOMB = 'bomb';
const FREEZE = 'freezetime';
const LIVE = 'live';
const OVER = 'over';
const GAMEOVER = 'gameover';
const CT = 'CT';
const T = 'T';

// Game State variables
var phaseCountdowns = {};
var map = {
    round: -1,
};
var roundChangeTrigger = true;
var allplayers = {};
var finalScore = [];
var gameIsOver = false;
var playersId = [];
var inGame = false;

// Generated data
var deaths = [];
var kills = [];
var economyValue = [];

// Server-client
const WebSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
var connection;

server.listen(8080, function() {
    console.log('Server listening to port 8080.');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

wsServer.on('request', function(request){
    connection = request.accept('server-client-protocol', request.origin);
    
    console.log((new Date()) + ' - Accepted connection from: ' + request.remoteAddress);
    const connected = {
        type: 'connection',
        message: 'Connected to server!',
    }
    connection.send(JSON.stringify(connected));
    
    connection.on('message', function(message) {
        const messageType = message.type;
        if (messageType === 'utf8') {
            console.log(new Date() + ' - Received message: ' + message.utf8Data);
        } else {
            console.log(new Date() + ' - [ERROR] Unhandled message type.');
        }
    })
});

// CS:GO Connection
app.post('/', (req, res) => {
    res.send("OK");

    if (!gameIsOver) {
        var body = "";
        req.on("data", (data) => {
            body += data;
        });
        req.on("end", () => {
            const gameState = JSON.parse(body);
            inGame = gameState.player.activity === 'playing';
            if (inGame) {
                checkGameEvents(gameState);
            }
        });
    }
});

function getPlayersId(players) {
    playersId = Object.keys(players);
}

function checkGameEvents(gameState) {
    const current_phase = gameState.phase_countdowns.phase;

    if (current_phase === LIVE || current_phase === BOMB || current_phase === OVER ) {
        
        if (roundHasChanged(gameState.map.round, map.round)) {
            getPlayersId(gameState.allplayers);
            roundChangeTrigger = true;
        };
        
        if(Object.keys(allplayers).length > 0) {
            
            for(var index in playersId) {
                id = playersId[index];
                
                if(gameState.allplayers[id] !== undefined){
                    
                    // Deaths
                    if(allplayers[id].state.health > gameState.allplayers[id].state.health && gameState.allplayers[id].state.health === 0) {
                        playerInfo = gameState.allplayers[id];
                        const playerWeapons = allplayers[id].weapons;

                        const death = {
                            name: playerInfo.name,
                            position: playerInfo.position,
                            time_left: gameState.phase_countdowns.phase === OVER ? phaseCountdowns.phase_ends_in : gameState.phase_countdowns.phase_ends_in,
                            round: gameState.phase_countdowns.phase === OVER ? gameState.map.round - 1 : gameState.map.round,
                            weapons: playerWeapons,
                        }
                        deaths.push(death);
                        const deathMessage = {
                            type: 'death',
                            message: 'Economy data array from server',
                            payload: deaths,
                        }
                        connection.send(JSON.stringify(deathMessage));
                    };
                    
                    // Kills
                    if(allplayers[id].state.round_kills < gameState.allplayers[id].state.round_kills) {
                        const isHeadShot = allplayers[id].state.round_killhs !== gameState.allplayers[id].state.round_killhs;
                        const playerWeapons = gameState.allplayers[id].weapons;
                        playerInfo = gameState.allplayers[id];
                        
                        const kill = {
                            name: playerInfo.name,
                            position: playerInfo.position,
                            time_left: gameState.phase_countdowns.phase === OVER ? phaseCountdowns.phase_ends_in : gameState.phase_countdowns.phase_ends_in,
                            round: gameState.phase_countdowns.phase === OVER ? gameState.map.round - 1 : gameState.map.round,
                            head_shot: isHeadShot,
                            weapons: playerWeapons,
                        }
                        kills.push(kill);
                        const killMessage = {
                            type: 'kill',
                            message: 'Economy data array from server',
                            payload: kills,
                        }
                        connection.send(JSON.stringify(killMessage));
                    };
                }
            };
        }
        
        updateData(gameState);
    } else if (roundChangeTrigger && current_phase === FREEZE) {
        
        getPlayersId(gameState.allplayers);

        getFinalScore();

        var CTValue = 0;
        var TValue = 0;
        for(var index in playersId) {
            id = playersId[index]
            const player = gameState.allplayers[id];
            if (player.team === CT) {
                CTValue += player.state.money + player.state.equip_value;
            } else if (player.team === T) {
                TValue += player.state.money + player.state.equip_value;
            } else {
                console.log("Erro ao ler economia de jogador", id, ". Recebido: team", player.team);
            }
        }
        const roundEconomy = {
            CTValue,
            TValue,
            round: gameState.map.round,
        }
        economyValue.push(roundEconomy);
        const economyMessage = {
            type: 'economy',
            message: 'Economy data array from server',
            payload: economyValue,
        }
        connection.send(JSON.stringify(economyMessage));
        
        resetData();
    };
    
    if (gameState.map.phase === GAMEOVER) {
        gameIsOver = true;
        getFinalScore();
    }
};

function getFinalScore() {
    const allNames = [];
    
    for(var index = 0; index < 10; index++) {
        var playerFinalScore = {
            name: "",
            kills: 0,
            deaths: 0,
        }
        finalScore[index] = playerFinalScore;
    }
    
    for(var index in kills) {
        const playerName = kills[index].name;
        var nameIndex = allNames.indexOf(playerName);
        
        if (nameIndex === -1) {
            allNames.push(playerName);
            nameIndex = allNames.indexOf(playerName);
        }
        
        if(finalScore[nameIndex].name === "") {
            finalScore[nameIndex].name = playerName;
        }
        
        finalScore[nameIndex].kills++;
    };
    
    for(var index in deaths) {
        const playerName = deaths[index].name;
        var nameIndex = allNames.indexOf(playerName);
        
        if (nameIndex === -1) {
            allNames.push(playerName);
            nameIndex = allNames.indexOf(playerName);
        }
        
        if(finalScore[nameIndex].name === "") {
            finalScore[nameIndex].name = playerName;
        }
        
        finalScore[nameIndex].deaths++;
    }
}

function resetData() {
    roundChangeTrigger = false;
}

function updateData(gameState) {
    if(gameState.provider && gameState.phase_countdowns && gameState.map && gameState.round && gameState.bomb && gameState.allplayers && gameState.auth) {
        provider = JSON.parse(JSON.stringify(gameState.provider));
        phaseCountdowns = JSON.parse(JSON.stringify(gameState.phase_countdowns));
        map = JSON.parse(JSON.stringify(gameState.map));
        round = JSON.parse(JSON.stringify(gameState.round));
        bomb = JSON.parse(JSON.stringify(gameState.bomb));
        allplayers = JSON.parse(JSON.stringify(gameState.allplayers));
        getPlayersId(allplayers);
        auth = JSON.parse(JSON.stringify(gameState.auth));
    };
};

function roundHasChanged(fromGameState, fromMemory) {
    const hasChanges = fromGameState > fromMemory;
    return hasChanges;
};

module.exports = app;