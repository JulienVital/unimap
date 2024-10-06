// Définir l'interface pour la taille d'une salle de classe
export interface SizeNode {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Node {
  position: Position;
  id: string;
}
// Interface pour une salle de classe
interface Classroom extends Node {
  type: "classroom";
  size: SizeNode;
}
interface Door extends Node {
  type: "door";
}
// Interface pour la position d'un noeud (point)
interface Position {
  top: number;
  left: number;
}

// Structure principale du graphe
interface Graph {
  node: { [key: string]: Classroom };
  door: { [key: string]: Door };
  point: { [key: string]: { position: Position; relation: string[] } };
}

// Exemple de données
export const graph: Graph = {
  node: {
    SD327: {
      type: "classroom",
      position: {
        top: 16.84,
        left: 10.81,
      },
      id: "SD327",
      size: {
        top: 14.88,
        left: 6.48,
        width: 13.5,
        height: 9.5,
      },
    },
    SD330: {
      type: "classroom",
      position: {
        top: 17,
        left: 33,
      },
      id: "SD330",
      size: {
        top: 14.88,
        left: 26,
        width: 10,
        height: 13,
      },
    },
    SD335: {
      type: "classroom",
      position: {
        top: 42,
        left: 40,
      },
      id: "SD335",
      size: {
        top: 38,
        left: 26,
        width: 21.3,
        height: 15,
      },
    },
    SD338: {
      type: "classroom",
      position: {
        top: 46,
        left: 55,
      },
      id: "SD338",
      size: {
        top: 38,
        left: 47.7,
        width: 17,
        height: 17,
      },
    },
    SD341: {
      type: "classroom",
      position: {
        top: 43.5,
        left: 66,
      },
      id: "SD341",
      size: {
        top: 38,
        left: 65,
        width: 3.3,
        height: 11.5,
      },
    },
    SD366: {
      type: "classroom",
      position: {
        top: 73.27,
        left: 10.37,
      },
      id: "SD366",
      size: {
        top: 65.5,
        left: 6,
        width: 7,
        height: 13.8,
      },
    },
    SD364: {
      type: "classroom",
      position: {
        top: 86.63,
        left: 9,
      },
      id: "SD364",
      size: {
        top: 80,
        left: 6,
        width: 7,
        height: 13,
      },
    },
    SD362: {
      type: "classroom",
      position: {
        top: 85,
        left: 24.32,
      },
      id: "SD362",
      size: {
        top: 75,
        left: 13,
        width: 20,
        height: 18,
      },
    },
    SD353: {
      type: "classroom",
      position: {
        top: 85,
        left: 63,
      },
      id: "SD353",
      size: {
        top: 75,
        left: 54.5,
        width: 21.5,
        height: 18.2,
      },
    },
    SD352A: {
      type: "classroom",
      position: {
        top: 86.78,
        left: 79.84,
      },
      id: "SD352A",
      size: {
        top: 70,
        left: 76,
        width: 7,
        height: 23.5,
      },
    },
  },
  point: {
    a: {
      position: {
        top: 16,
        left: 22,
      },
      relation: ["b"],
    },
    b: {
      position: {
        top: 40,
        left: 22,
      },
      relation: ["SD335", "a"],
    },
    c: {
      position: {
        top: 65,
        left: 22,
      },
      relation: ["SD362", "b"],
    },
    d: {
      position: {
        top: 84,
        left: 22,
      },
      relation: ["SD366", "SD364", "c"],
    },
    e: {
      position: {
        top: 65,
        left: 38,
      },
      relation: ["SD335", "c"],
    },
    f: {
      position: {
        top: 40,
        left: 38,
      },
      relation: ["SD338", "e"],
    },
    g: {
      position: {
        top: 40,
        left: 56,
      },
      relation: ["SD341", "f", "h"],
    },
    h: {
      position: {
        top: 66,
        left: 56,
      },
      relation: ["g", "e"],
    },
    i: {
      position: {
        top: 66,
        left: 63,
      },
      relation: ["h", "sd353"],
    },
    j: {
      position: {
        top: 80,
        left: 63,
      },
      relation: ["i", "sd352A"],
    },
  },
  door: {
    a: {
      id: "porte A",
      type: "door",
      position: {
        left: 76.34,
        top: 79.50,
      },
    },
    b: {
      type: "door",
      id: "porte B",
      position: {
        left: 63.87,
        top: 76.24,
      },
    },
    c: {
      type: "door",
      id: "porte C",
      position: {
        left: 64.47,
        top: 39.5,
      },
    },
    d: {
      type: "door",
      id: "porte D",
      position: {
        left: 56.42,
        top: 54.9,
      },
    },
    e: {
      type: "door",
      id: "porte E",
      position: {
        left: 47.55,
        top: 40,
      },
    },
    f: {
      type: "door",
      id: "porte F",
      position: {
        left: 25.7,
        top: 40,
      },
    },
    g: {
      type: "door",
      id: "porte G",
      position: {
        left: 39,
        top: 54,
      },
    },
    h: {
      type: "door",
      id: "porte H",
      position: {
        left: 25.61,
        top: 16.33,
      },
    },
    i: {
      type: "door",
      id: "porte I",
      position: {
        left: 20.13,
        top: 15.86,
      },
    },
    j: {
      type: "door",
      id: "porte J",
      position: {
        left: 21.3,
        top: 75,
      },
    },
    k: {
      type: "door",
      id: "porte K",
      position: {
        left: 12.9,
        top: 77.7,
      },
    },
    l: {
      type: "door",
      id: "porte L",
      position: {
        left: 12.9,
        top: 90.51,
      },
    },
    m: {
      type: "door",
      id: "porte M",
      position: {
        left: 7.76,
        top: 79.32,
      },
    },
  },
};
