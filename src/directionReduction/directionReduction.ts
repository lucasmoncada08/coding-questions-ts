type Axes = "vertical" | "horizontal";

type AxisChange = {
    axis: Axes,
    change: number,
}

export type Directions = "North" | "South" | "East" | "West";

const mapDirectionToAxisChange: Record<string, AxisChange> = {
    "North": {"axis": "vertical", "change": 1},
    "South": {"axis": "vertical", "change": -1},
    "East": {"axis": "horizontal", "change": 1},
    "West": {"axis": "horizontal", "change": -1},
}

export function reduceDirections(directions: Directions[]): Directions[] {
    const axisOfMovement = {
        vertical: 0,
        horizontal: 0
    }

    for (let i=0; i<directions.length; i++) {
        const directionMap = mapDirectionToAxisChange[directions[i]];
        axisOfMovement[directionMap.axis] += directionMap.change;
    }

    const reducedDirections: Directions[] = [];
    if (axisOfMovement.vertical > 0) {     
        for (let i=0; i<axisOfMovement.vertical; i++) {
            reducedDirections.push("North");
        }
    } else {
        for (let i=0; i>axisOfMovement.vertical; i--) {
            reducedDirections.push("South");
        }
    }

    if (axisOfMovement.horizontal > 0) {  
        for (let i=0; i<axisOfMovement.horizontal; i++) {
            reducedDirections.push("East");
        }
    } else {
        for (let i=0; i>axisOfMovement.horizontal; i--) {
            reducedDirections.push("West");
        }
    }

    return reducedDirections;
}