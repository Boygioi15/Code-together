import { useState, useEffect } from "react";
import "./style.css"
import screen from "./assets/blackScreen.png"
import { Tooltip } from 'react-tooltip'

import { ImCheckboxChecked,ImCheckboxUnchecked } from "react-icons/im";

const seatWidth = 50;
const seatHeight = 40;
const gapX = 15;
const gapY = 10;
export default function RoomCreate(){
    const [roomName, setRoomName] = useState("");
    const [roomRow, setRoomRow] = useState();
    const [roomCol, setRoomCol] = useState();
    const [center,setCenter] = useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    }) 

    const [roomSeat, setRoomSeat] = useState([]);
    const [currentSeatType, setCurrentSeatType] = useState("N");
    const handleToggleAll = () => {
        let seat;
        if(currentSeatType==="P"||currentSeatType===""){
            seat="N";
        }
        else{
            seat = currentSeatType;
        }
        const updatedRoomSeat = [...roomSeat]; // Create a shallow copy of roomSeat to avoid mutating state directly

        for (let i = 0; i < updatedRoomSeat.length; i++) {
            for (let j = 0; j < updatedRoomSeat[i].length; j++) {
                updatedRoomSeat[i][j] = seat;
            }
        }
        setRoomSeat(updatedRoomSeat)
    };
    const handleDeselectAll = () => {
        const updatedRoomSeat = [...roomSeat]; // Create a shallow copy of roomSeat to avoid mutating state directly

        for (let i = 0; i < updatedRoomSeat.length; i++) {
            for (let j = 0; j < updatedRoomSeat[i].length; j++) {
                updatedRoomSeat[i][j] = "";
            }
        }
        setRoomSeat(updatedRoomSeat)
    };
    const handleUpdateSeat = (row,col) =>{
        const updatedRoomSeat = [...roomSeat]; 
        if(updatedRoomSeat[row][col-1]==="P"){
            col--;
        }
        console.log(`Update at ${row},${col}`)
        if(currentSeatType==="P"){
            if(col>updatedRoomSeat[0].length-1){
                alert("Vị trí cho ghế đôi không hợp lệ");
                return;
            }
            else if(updatedRoomSeat[row][col+1]!==""){
                alert("Vị trí cho ghế đôi không hợp lệ");
                return;
            }
        }
        updatedRoomSeat[row][col]= currentSeatType;
        setRoomSeat(updatedRoomSeat)
    }
    useEffect(()=>{
        console.log(currentSeatType)
    },[currentSeatType])
    // Initialize the roomSeat 2D array
    useEffect(() => {
        const initRoomSeat = Array.from({ length: roomRow }, () =>
            Array.from({ length: roomCol }, () => "")
        );
        setRoomSeat(initRoomSeat);
    }, [roomCol, roomRow]);
    
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        // Add event listener for mousemove to track cursor position
        const handleMouseMove = (e) => {
          setCursorPosition({
            x: e.clientX,
            y: e.clientY,
          });
        };
    
        // Attach event listener
        window.addEventListener("mousemove", handleMouseMove);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);

    return(
        <div className="createRoom">
            <div className="roomInputs">
                <h1>Create a room!</h1>
                <input
                    value={roomName}
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                    value={roomRow}
                    type="text"
                    placeholder="Row"
                    onChange={(e) => setRoomRow(e.target.value)}
                />
                <input
                    value={roomCol}
                    type="text"
                    placeholder="Col"
                    onChange={(e) => setRoomCol(e.target.value)}
                />
                <input
                    value={center.x1}
                    type="number"
                    placeholder="x1"
                    onChange={(e) => setCenter({
                        ...center,
                        x1: +e.target.value  // Use e.target.value to get the input value
                    })}
                />
                <input
                    value={center.y1}
                    type="number"
                    placeholder="y1"
                    onChange={(e) => setCenter({
                        ...center,
                        y1: +e.target.value  // Use e.target.value to get the input value
                    })}
                />
                <input
                    value={center.x2}
                    type="number"
                    placeholder="x2"
                    onChange={(e) => setCenter({
                        ...center,
                        x2: +e.target.value  // Use e.target.value to get the input value
                    })}
                />
                <input
                    value={center.y2}
                    type="number"
                    placeholder="y2"
                    onChange={(e) => setCenter({
                        ...center,
                        y2: +e.target.value  // Use e.target.value to get the input value
                    })}
                />

            </div>
            <RoomDisplay roomSeat= {roomSeat} roomName={roomName} roomCol={roomCol} roomRow={roomRow} handleUpdateSeat={handleUpdateSeat} center={center}>

            </RoomDisplay>


            <div className="stickyToolbar">
                <ImCheckboxChecked onClick={handleToggleAll}data-tooltip-id="my-tooltip" data-tooltip-content="Chọn tất cả ghế" className="selectAll"/>
                <ImCheckboxUnchecked onClick={handleDeselectAll} data-tooltip-id="my-tooltip" data-tooltip-content="Hủy chọn tất cả ghế" className="deselectAll"/>
                <div onClick={()=>setCurrentSeatType("")} data-tooltip-id="my-tooltip" data-tooltip-content="Bỏ chọn ghế" 
                className={"deselect " + (currentSeatType===""? "selected ": "")}/>
                <div onClick={()=>setCurrentSeatType("N")} data-tooltip-id="my-tooltip" data-tooltip-content="Chọn ghế thường" 
                className={(currentSeatType==="N"? "selected ": "") + "selectNormal"}/>
                <div onClick={()=>setCurrentSeatType("V")} data-tooltip-id="my-tooltip" data-tooltip-content="Chọn ghế VIP" 
                className={(currentSeatType==="V"? "selected ": "") + "selectVIP"}/>
                <div onClick={()=>setCurrentSeatType("P")} data-tooltip-id="my-tooltip" data-tooltip-content="Chọn ghế đôi" data-tooltip-place="top" 
                className={(currentSeatType==="P"? "selected ": "") + "selectPair"}/>
                <Tooltip className="tooltip" id="my-tooltip" place="left"/>
            </div>
            
            
        </div>
    )
}

function RoomDisplay({ roomSeat, roomName, handleUpdateSeat, children, center}) {
    //console.log(roomSeat)
    let flag = false;
    return (
        <div className="RoomDisplay">
            <h1>{roomName}</h1>
            <div className="screen">
                <img src={screen} alt="Screen" />
                <p className="center-text">Màn hình</p>
            </div>
            
            <div className="RoomSeats">
                <div className="col">
                    {roomSeat.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            <span className="row-label">{String.fromCharCode(65 + rowIndex)}</span>
                            <div className="seatRow">
                                {
                                    // Use for loop to iterate over the seats in the row
                                    (() => {
                                        const seatSlots = [];
                                        let seatNum = 1;
                                        for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
                                            const seat = row[seatIndex];
                                            if(seat===""){
                                                seatSlots.push(
                                                    <SeatSlot key={seatIndex} seatType={seat} handleOnClick={() => handleUpdateSeat(rowIndex, seatIndex)}>
                                                       {!flag &&
                                                        center.x1 >= 0 &&
                                                        center.y1 >= 0 &&
                                                        center.x2 >= 0 &&
                                                        center.y2 >= 0 &&
                                                        center.x2 >= center.x1 &&
                                                        center.y2 >= center.y1 && (                          
                                                            <>
                                                            {flag=true}
                                                            <div                                                     
                                                                style={{
                                                                position: "absolute",
                                                                borderColor: "red",
                                                                borderRadius: "10px",
                                                                borderWidth: "4px",
                                                                borderStyle: "solid",
                                                                top: - 10 + (center.x1)*(seatHeight+gapY),
                                                                left: - 10 + (center.y1)*(seatWidth+gapX),
                                                                width:
                                                                    (center.y2 - center.y1 + 1) * seatWidth +
                                                                    (center.y2 - center.y1) * gapX +
                                                                    10 + 8,
                                                                height:
                                                                    (center.x2 - center.x1 + 1) * seatHeight +
                                                                    (center.x2 - center.x1) * gapY +
                                                                    10 + 7,
                                                                boxSizing: "border-box",
                                                                zIndex: -1,
                                                                }}
                                                            />
                                                            </>
                                                        )}
                                                    </SeatSlot>
                                                );
                                            }
                                            else{
                                                seatSlots.push(
                                                    <SeatSlot key={seatIndex} label={String.fromCharCode(65 + rowIndex)+seatNum} seatType={seat} handleOnClick={() => handleUpdateSeat(rowIndex, seatIndex)}>
                                                        {!flag &&
                                                        center.x1 >= 0 &&
                                                        center.y1 >= 0 &&
                                                        center.x2 >= 0 &&
                                                        center.y2 >= 0 &&
                                                        center.x2 >= center.x1 &&
                                                        center.y2 >= center.y1 && (                          
                                                            <>
                                                            {flag=true}
                                                            <div                                                     
                                                                style={{
                                                                position: "absolute",
                                                                borderColor: "red",
                                                                borderRadius: "10px",
                                                                borderWidth: "4px",
                                                                borderStyle: "solid",
                                                                top: - 10 + (center.x1)*(seatHeight+gapY),
                                                                left: - 10 + (center.y1)*(seatWidth+gapX),
                                                                width:
                                                                    (center.y2 - center.y1 + 1) * seatWidth +
                                                                    (center.y2 - center.y1) * gapX +
                                                                    10 + 8,
                                                                height:
                                                                    (center.x2 - center.x1 + 1) * seatHeight +
                                                                    (center.x2 - center.x1) * gapY +
                                                                    10 + 7,
                                                                boxSizing: "border-box",
                                                                zIndex: -1,
                                                                }}
                                                            />
                                                            </>
                                                        )}
                                                    </SeatSlot>
                                                );
                                            }
                                            if(seat!==""){
                                                seatNum++;
                                            }
                                            if(seat==="P"){
                                                seatIndex++;
                                            }
                                        }
                                        return seatSlots;
                                    })()
                                }
                            </div>
                        </div>
                    ))}
                </div>
                {children}
            </div>
        </div>
    );
}

function SeatSlot({ label, seatType, handleOnClick, children }) {
    if(seatType===""){
        return <div onClick={handleOnClick}className="SeatSlot_Empty">{label}{children}</div>;
    }
    else if(seatType==="N"){
        return <div onClick={handleOnClick}className="SeatSlot_Normal">{label}{children}</div>;
    }
    else if(seatType==="V"){
        return <div onClick={handleOnClick}className="SeatSlot_VIP">{label}{children}</div>;
    }
    else if(seatType==="P"){
        return <div onClick={handleOnClick}className="SeatSlot_Pair">{label}{children}</div>;
    }
    
}
