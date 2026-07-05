namespace MultiplayerPlus {
    export interface Player {
        id: number;
        name: string;
        score: number;
        x: number;
        y: number;
        health: number;
        // Add more properties as needed
        data: any; // Custom data
    }

    let players: Player[] = [];
    let localPlayerId: number = 0;
    let maxPlayers: number = 20;
    let nextPlayerId: number = 1;

    /**
     * Initialize the multiplayer system
     * @param max maximum number of players (default 20)
     */
    //% block="initialize multiplayer with max $maxPlayers"
    //% max.defl=20
    //% group="Setup"
    export function initialize(max: number = 20): void {
        maxPlayers = Math.min(max, 20);
        players = [];
        nextPlayerId = 1;
        addPlayer("Local Player"); // Add local player by default
        localPlayerId = players[0].id;
    }

    /**
     * Add a new player (e.g., AI bot or remote)
     * @param name player name
     */
    //% block="add player named $name"
    //% group="Players"
    export function addPlayer(name: string): number {
        if (players.length >= maxPlayers) {
            console.log("Max players reached (20)");
            return -1;
        }
        const player: Player = {
            id: nextPlayerId++,
            name: name,
            score: 0,
            x: 0,
            y: 0,
            health: 100,
            data: {}
        };
        players.push(player);
        return player.id;
    }

    /**
     * Get player by ID
     */
    //% block="get player with id $id"
    //% group="Players"
    export function getPlayer(id: number): Player {
        return players.find(p => p.id === id);
    }

    /**
     * Get all players
     */
    //% block="get all players"
    //% group="Players"
    export function getAllPlayers(): Player[] {
        return players;
    }

    /**
     * Remove a player
     */
    //% block="remove player with id $id"
    //% group="Players"
    export function removePlayer(id: number): void {
        players = players.filter(p => p.id !== id);
    }

    /**
     * Update player position (example)
     */
    //% block="update player $id position x $x y $y"
    //% group="Update"
    export function updatePosition(id: number, x: number, y: number): void {
        const p = getPlayer(id);
        if (p) {
            p.x = x;
            p.y = y;
        }
    }

    /**
     * Update player score
     */
    //% block="add $points to player $id score"
    //% group="Update"
    export function addScore(id: number, points: number): void {
        const p = getPlayer(id);
        if (p) p.score += points;
    }

    /**
     * Get local player ID
     */
    //% block="local player id"
    //% group="Info"
    export function getLocalPlayerId(): number {
        return localPlayerId;
    }

    /**
     * Get number of active players
     */
    //% block="number of players"
    //% group="Info"
    export function playerCount(): number {
        return players.length;
    }

    /**
     * For each player (loop helper)
     */
    //% block="for each player $player do"
    //% draggableParameters="player"
    //% group="Loops"
    export function forEachPlayer(handler: (player: Player) => void) {
        players.forEach(handler);
    }

    // Example event
    export function onPlayerAdded(handler: (player: Player) => void) {
        // Register custom event if needed (extend as required)
    }
}
