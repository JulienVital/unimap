// Définir l'interface pour la taille d'une salle de classe
interface Size {
  top: number;
  left: number;
  width: number;
  height: number;
}

// Interface pour une salle de classe
interface Classroom {
  size: Size;
}

// Interface pour la position d'un noeud (point)
interface Position {
  top: number;
  left: number;
}

// Interface pour un noeud avec sa position et ses relations
interface Node {
  position: Position;
  relation: string[]; // Relations avec d'autres noeuds ou salles
}

// Structure principale du graphe
interface Graph {
  classroom: { [key: string]: Classroom };
  point: { [key: string]: Node };
}

// Exemple de données
export const graph: Graph = {
  classroom: {
    SD327: {
      size: {
        top: 14.88,
        left: 6.48,
        width: 13.5,
        height: 9.5,
      },
    },
    SD330: {
      size: {
        top: 14.88,
        left: 26,
        width: 10,
        height: 13,
      },
    },
    SD335: {
      size: {
        top: 38,
        left: 26,
        width: 21.3,
        height: 15,
      },
    },
    SD338: {
      size: {
        top: 38,
        left: 47.7,
        width: 17,
        height: 17,
      },
    },
    SD341: {
      size: {
        top: 38,
        left: 65,
        width: 3.3,
        height: 11.5,
      },
    },
    SD366: {
      size: {
        top: 65.5,
        left: 6,
        width: 7,
        height: 13.8,
      },
    },
    SD364: {
      size: {
        top: 80,
        left: 6,
        width: 7,
        height: 13,
      },
    },
    SD362: {
      size: {
        top: 75,
        left: 13,
        width: 20,
        height: 18,
      },
    },
    SD353: {
      size: {
        top: 75,
        left: 54.5,
        width: 21.5,
        height: 18.2,
      },
    },
    SD352A: {
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
      relation: ["SD330", "SD327", "b"],
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
};
