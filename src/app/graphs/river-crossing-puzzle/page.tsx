"use client";
import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { solve_pg_bfs } from "@/utils/data_structures/River_crossing_puzzles/PG";
import Image from 'next/image'


export default function RiverCrossingPuzzle() {
  const [ GL, setGL ] = useState(3);
  const [ PL, setPL ] = useState(3);

  const [ GB, setGB ] = useState(0);
  const [ PB, setPB ] = useState(0);

  const [ GR, setGR ] = useState(0);
  const [ PR, setPR ] = useState(0);

  const [ boatLocation, setBoatLocation ] = useState("L");

  const Guard = (props: {
    onClick?:() => void
  }) => {
    return (
      <div
        className="guard w-fit p-4 cursor-pointer"
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
        className="prisoner w-fit p-4 cursor-pointer"
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
        className="boat cursor-pointer w-fit"
        onClick={props.onClick}
      >
        <Image src="/pixil-boat.png" width={64} height={64} alt="boat" />
      </div>
    )
  }


  /**
   * @name addGuardPrisonerToBoat()
   * 
   * @param {string} character_location
   * @update 
   */
  const addGuardPrisonerToBoat = (character_location: string) => {
    switch(character_location) {
      // add guard from left shore to boat
      case 'GL':
        setGL(GL - 1);
        setGB(GB + 1);
        break;

      // add prisoner from left shore boat
      case 'PL':
        setPL(PL - 1);
        setPB(PB + 1);
        break;

      // remove guard from boat
      case 'GB':
        setGB(GB - 1);

        if (boatLocation === "L") {
          setGL(GL + 1);
        }
        if (boatLocation === "R") {
          setGR(GR + 1);
        }
        break;

      // remove prisoner from boat
      case 'PB':
        setPB(PB - 1);

        if (boatLocation === "L") {
          setPL(PL + 1);
        }
        if (boatLocation === "R") {
          setPR(PR + 1);
        }
        break;

      // add guard from right shore to boat
      case 'GR':
        setGR(GR - 1);
        setGB(GB + 1);
        break;

      // add prisoner from right shore to boat
      case 'PR':
        setPR(PR - 1);
        setPB(PB + 1);
        break;
    }
  }

  const [movesCount, setMovesCount] = useState(0);
  const [ errorMsg, setErrorMsg ] = useState('');

  /**
   * @name sailToShore()
   * 
   * @returns 
   */
  const sailToShore = () => {
    // base cases
    if (GB == 0 && PB == 0) {
      setErrorMsg('No one is on boat to steer.')
      return;
    }
    if ((GB + PB) > 2) {
      setErrorMsg('Boat is heavy to sail. It can only carry 2 people.')
      return;
    }

    /**
     * calculate left shore values first by
     * combining left shore values with boat values
     * and set new boat side
     */
    const newGL = boatLocation === 'L' ? GL : GL + GB;
    const newPL = boatLocation === 'L' ? PL : PL + PB;
    const newBoatSide = boatLocation === 'L' ? 'R' : 'L';
    
    /**
     * check if its valid move
     */
    const newMove = `${newGL},${newPL},${newBoatSide}`;
    const isMoveValid = solve_pg_bfs(newMove);

    if (isMoveValid === undefined) {
      setErrorMsg('There are more prisoners than guards on shore.');
      return;
    }

    if (isMoveValid.guards_left === 0 &&
      isMoveValid.prisoners_left === 0 &&
      isMoveValid.boat_side === 'R'
    ) {
      setErrorMsg(`Successfully crossed the river in ${movesCount} moves.`);
    }

    setMovesCount(prev => prev + 1);


    /**
     * update GL,PL,GR,PR with boat values
     * for UI
     */
    if (boatLocation === 'L') {
      setGR(GR + GB)
      setPR(PR + PB)
    }

    if (boatLocation === 'R') {
      setGL(GL + GB)
      setPL(PL + PB) 
    }

    setBoatLocation(newBoatSide)
    // reset boat
    setGB(0)
    setPB(0)
  }


  const [ startGame, setStartGame ] = useState(false);
  const [ showRules, setShowRules ] = useState(false);

  const Intro = () => {
    const startGame = () => {
      setStartGame(true)
      setShowRules(true)
    }

    return (
      <div className="intro">
        <Image className="inline-block my-[25px]" src="/pixil-title.png" width={406} height={197} alt="title" />
        <br />
        <a
          className="cursor-pointer"
          onClick={() => startGame()}
        >
          Start Game
        </a>
      </div>
    )
  }
  
  const Rules = () => {
    return (
      <div className="modal rules">
        <div className="modal--inner rules-inner">
          <a
            className="modal--close cursor-pointer"
            onClick={() => setShowRules(false)}
          >
            x
          </a>
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
      </div>
    )
  }

  const Error = () => {
    return (
      <div className="modal error">
        <div className="modal--inner">
          <a
            className="modal--close cursor-pointer"
            onClick={() => setErrorMsg('')}
          >
            x
          </a>
          <p className="text-xs">
            {errorMsg}
          </p>
        </div>
      </div>
    )
  }

  const resetGame = () => {
    setGL(3)
    setPL(3)
    setBoatLocation('L')
    setGB(0)
    setPB(0)
    setGR(0)
    setPR(0)

    setMovesCount(0)
  }


  return (
    <div>
      <div className="pg-puzzle relative my-2 mx-auto w-[550px] h-[300px]">
        {!startGame && <Intro />}
        {showRules && <Rules />}
        {errorMsg != '' && <Error />}
        
        <div
          className="absolute top-[10px] left-[10px] cursor-pointer"
          onClick={resetGame}
        >
          reset
        </div>

        <div className="absolute top-[10px] left-[15em]">
          moves: {movesCount}
        </div>
        <a
          className="cursor-pointer absolute top-[10px] right-[10px]"
          onClick={() => setShowRules(true)}
        >
          <Image src="/pixil-rules.png" width={32} height={32} alt="rules" />
        </a>

        <div className="arena grid grid-cols-3 h-full">
          <div className="left-shore grass grid grid-cols-2 content-center p-4">
            <div className="col-span-1">
              {Array.from(Array(GL), (e, i) => {
                return <Guard key={i} onClick={() => addGuardPrisonerToBoat("GL")}/>
              })}
            </div>
            <div className="col-span-1">
              {Array.from(Array(PL), (e, i) => {
                return <Prisoner key={i} onClick={() => addGuardPrisonerToBoat("PL")}/>
              })}
            </div>
          </div>

          <div className="river-boat water bg-blue-900 grid grid-cols-2 content-end p-6">
            <div className={`col-start-${boatLocation === 'L' ? '1' : '2'}`}>
              {Array.from(Array(GB), (e, i) => {
                return <Guard key={i} onClick={() => addGuardPrisonerToBoat("GB")}/>
              })}
              {Array.from(Array(PB), (e, i) => {
                return <Prisoner key={i} onClick={() => addGuardPrisonerToBoat("PB")}/>
              })}
              <Boat onClick={() => sailToShore()} />
            </div>
          </div>

          <div className="right-shore grass grid grid-cols-2 content-center p-4">
            <div className="col-span-1">
              {Array.from(Array(PR), (e, i) => {
                return <Prisoner key={i} onClick={() => addGuardPrisonerToBoat("PR")}/>
              })}
            </div>
            <div className="col-span-1">
              {Array.from(Array(GR), (e, i) => {
                return <Guard key={i} onClick={() => addGuardPrisonerToBoat("GR")}/>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}