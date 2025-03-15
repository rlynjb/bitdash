"use client";
import { useState } from "react";
import { solve_pg_bfs } from "@/utils/data_structures/River_crossing_puzzles/PG";
import Image from 'next/image'


export default function RiverCrossingPuzzle() {
  const [ G_L, setG_L ] = useState(3);
  const [ P_L, setP_L ] = useState(3);

  const [ G_B, setG_B ] = useState(0);
  const [ P_B, setP_B ] = useState(0);

  const [ G_R, setG_R ] = useState(0);
  const [ P_R, setP_R ] = useState(0);

  const [ boatNewDirection, setBoatNewDirection ] = useState("R");


  const Guard = (props: {
    onClick?:() => void
  }) => {
    return (
      <div
        className="guard py-4 text-center cursor-pointer"
        onClick={props.onClick}
      >
        <Image src="/police.png" width={32} height={32} alt="police" />
      </div>
    )
  }

  const Prisoner = (props: {
    onClick?:() => void
  }) => {
    return (
      <div
        className="prisoner py-4 text-center cursor-pointer"
        onClick={props.onClick}
      >
        <Image src="/prisoner.png" width={32} height={32} alt="prisoner" />
      </div>
    )
  }

  const Boat = (props: {
    onClick?:() => void
  }) => {
    return (
      <div
        className="boat text-2xl cursor-pointer"
        onClick={props.onClick}
      >
        
      ⛵  {boatNewDirection === 'R' ? '>>' : '<<'}
      </div>
    )
  }

  /**
   * @name update()
   * 
   * @param {string} character_location
   * @return {string} "0,0,L" - ex. return string format
   */
  const update = (character_location: string) => {
    switch(character_location) {
      case 'G_L':
        setG_L(G_L - 1);
        setG_B(G_B + 1);
        break;

      case 'P_L':
        setP_L(P_L - 1);
        setP_B(P_B + 1);
        break;

      case 'G_B':
        // check where boat is at to determine removing character off boat
        if (boatNewDirection === "R") {
          setG_B(G_B - 1);
          setG_L(G_L + 1);
        }
        if (boatNewDirection === "L") {
          setG_B(G_B - 1);
          setG_R(G_R + 1);
        }
        break;

      case 'P_B':
        // check where boat is at to determine removing character off boat
        if (boatNewDirection === "R") {
          setP_B(P_B - 1);
          setP_L(P_L + 1);
        }
        if (boatNewDirection === "L") {
          setP_B(P_B - 1);
          setP_R(P_R + 1);
        }
        break;

      case 'G_R':
        setG_R(G_R - 1);
        setG_B(G_B + 1);
        break;

      case 'P_R':
        setP_R(P_R - 1);
        setP_B(P_B + 1);
        break;
    }
  }


  const checkMove = () => {
    console.log(`check move: ${G_L},${P_L},${boatNewDirection}`)

    // solve_pg_bfs will determine if its valid move
    // will rely on what msg/state to display on front-end
    solve_pg_bfs(`${G_L},${P_L},${boatNewDirection}`)
  }


  return (
    <div className="p-2">
      WIP
      <div className="pg-puzzle relative my-2 mx-auto w-[45em] h-[25em]">
        <div className="intro absolute">
          PG - start game
        </div>
        <div className="rules absolute right-0">
          rules
        </div>

        <div className="arena grid grid-cols-3 h-full">
          <div className="left-shore bg-green-950 grid grid-cols-2 content-between p-6">
            <div className="col-span-1">
              {Array.from(Array(G_L), (e, i) => {
                return <Guard key={i} onClick={() => update("G_L")}/>
              })}
            </div>
            <div className="col-span-1">
              {Array.from(Array(P_L), (e, i) => {
                return <Prisoner key={i} onClick={() => update("P_L")}/>
              })}
            </div>
          </div>

          <div className="river-boat bg-blue-900 grid grid-cols-2 content-between p-6">
            <div className="col-span-1">
              {Array.from(Array(G_B), (e, i) => {
                return <Guard key={i} onClick={() => update("G_B")}/>
              })}
            </div>
            <div className="col-span-1">
              {Array.from(Array(P_B), (e, i) => {
                return <Prisoner key={i} onClick={() => update("P_B")}/>
              })}
            </div>
            <div className="col-span-2">
              <Boat onClick={() => checkMove()} />
            </div>
          </div>

          <div className="right-shore bg-green-950 grid grid-cols-2 content-between p-6">
            <div className="col-span-1">
              {Array.from(Array(G_R), (e, i) => {
                return <Guard key={i} onClick={() => update("G_R")}/>
              })}
            </div>
            <div className="col-span-1">
              {Array.from(Array(P_R), (e, i) => {
                return <Prisoner key={i} onClick={() => update("P_R")}/>
              })}
            </div>
          </div>
        </div>
      </div>


      <h2>
        Prisoners and Guards
      </h2>
      <p className="text-xs">
        Three guards and three prisoners need to cross a river.
        At their disposal is a boat that can carry two people at most.
        <br/>
        - The prisoners are handcuffed and cannot escape if left alone.
        <br/>
        - However, if there are more prisoners than guards on a shore, the prisoners will gang up on the guards and steal their keys.
        <br/>
        - Thus, on each shore, a guard must be accompanied by at most the same number of prisoners.
      </p>
    </div>
  )
}