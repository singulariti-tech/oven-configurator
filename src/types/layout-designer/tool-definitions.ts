import { Position, Direction, AccessWay } from "./layout-types";

export const ToolGroups = {
  entryExit: [
    {
      id: "as_as_1",
      icon: "AS_AS_1.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.RIGHT,
          accessWay: AccessWay.ENTRANCE,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
      ],
    },
    {
      id: "as_as_2",
      icon: "AS_AS_2.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.RIGHT,
          accessWay: AccessWay.ENTRANCE,
        },
      ],
    },
    {
      id: "slant_1",
      icon: "SLANT_1.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.RIGHT,
          accessWay: AccessWay.ENTRANCE,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
      ],
    },
    {
      id: "slant_2",
      icon: "SLANT_2.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.RIGHT,
          accessWay: AccessWay.ENTRANCE,
        },
      ],
    },
    {
      id: "slant_3",
      icon: "SLANT_3.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
          accessWay: AccessWay.NONE,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
      ],
    },
    {
      id: "slant_4",
      icon: "SLANT_4.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
          accessWay: AccessWay.NONE,
        },
      ],
    },
    {
      id: "as_h_1_exit",
      icon: "AS_H-1_EXIT.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
      ],
    },
    {
      id: "as_h_1_entry",
      icon: "AS_H-1_ENTRY.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.ENTRANCE,
        },
      ],
    },
    {
      id: "slant_h_1_exit",
      icon: "SLANT_H-1_EXIT.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.EXIT,
        },
      ],
    },
    {
      id: "slant_h_1_entry",
      icon: "SLANT_H-1_ENTRY.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
          accessWay: AccessWay.ENTRANCE,
        },
      ],
    },
    {
      id: "slant_h",
      icon: "SLANT_H.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
          accessWay: AccessWay.NONE,
        },
      ],
    },
  ],
  straight: [
    {
      id: "dio_k_h",
      icon: "DIO_K_H.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "k_dio_h",
      icon: "K_DIO_H.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "k_sb_h_1",
      icon: "K_SB_H-1.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "k_sb_h",
      icon: "K_SB_H.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "sb",
      icon: "SB.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "k",
      icon: "K.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "pre_h_h",
      icon: "PRE-H_H.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "dio_h",
      icon: "DIO_H.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "sb_h",
      icon: "SB_H.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
    {
      id: "k_h",
      icon: "K_H.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.HORIZONTAL,
        },
      ],
    },
  ],
  uTurn: [
    {
      id: "90_turn_4",
      icon: "90-TURN_4.png",
      width: 2,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.BOTTOM,
        },
        {
          position: Position.RIGHT,
          direction: Direction.LEFT,
        },
        {
          position: Position.BOTTOM_RIGHT,
          direction: Direction.RIGHT,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.BOTTOM,
        },
      ],
    },
    {
      id: "90_turn_3",
      icon: "90-TURN_3.png",
      width: 2,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.RIGHT,
        },
        {
          position: Position.RIGHT,
          direction: Direction.BOTTOM,
        },
        {
          position: Position.BOTTOM_RIGHT,
          direction: Direction.BOTTOM,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.LEFT,
        },
      ],
    },
    {
      id: "turn_2",
      icon: "TURN_2.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.LEFT,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.TOP,
        },
      ],
    },
    {
      id: "turn_1",
      icon: "TURN_1.png",
      width: 1,
      height: 2,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.BOTTOM,
        },
        {
          position: Position.BOTTOM,
          direction: Direction.LEFT,
        },
      ],
    },
    {
      id: "90_turn_2",
      icon: "90-TURN_2.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.BOTTOM,
        },
      ],
    },
    {
      id: "90_turn_1",
      icon: "90-TURN_1.png",
      width: 1,
      height: 1,
      tiles: [
        {
          position: Position.ORIGIN,
          direction: Direction.BOTTOM,
        },
      ],
    },
  ],
};
