import React from 'react';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

export default function Card(props)
{
    let nav = useNavigate();
    return (
        <div className="card" style={{
            width: (props.style && props.style.width) ? props.style.width : "90%",
            height: (props.style && props.style.height) ? props.style.height : "450px",
            display: "grid",
            gridTemplateColumns: "minmax(250px,30%) 1fr",
            gridTemplateRows: "65px 1fr 80px",
            backgroundColor:"#FFFFFF",
            border: "4px solid black",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                   }}>
            <div style={{ gridColumn: "1/ span 2", gridRow: "1", fontSize: "24px", fontWeight: "bold", background:"linear-gradient(270deg, rgba(90, 10, 10, 1) 0%, rgba(35, 10, 10, 1) 100%)"  }}>
                <div style={{fontSize: "24px", fontWeight: "bold", paddingLeft: "16px", paddingTop: "8px", color:"white" }}>{props.title}</div>
            </div>
            <div style={{ gridColumn: "1", gridRow: "2",  }}>
                <img src={props.image} style={{ width: "100%", height: "100%" }} alt={props.title} />
            </div>
            <div style={{ gridColumn: "2", gridRow: "2",  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"near", padding:"16px", overflowY:"auto" }}>
                {props.children}
            </div>
            <div style={{ gridColumn: "1 / span 2", gridRow: "3",background:"linear-gradient(270deg, rgba(10, 10, 90, 1) 0%, rgba(10, 10, 35, 1) 100%)", display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"right", paddingTop:"8px", gap:"8px" }}>

                <Button id="confirmUserButton" variant='contained' color="primary" style={{ width:"150px", height:"50px" }} onClick={
                    async () => {
                        nav('/Corona/Login');
                    }
                }><FontAwesomeIcon icon={faSquareCaretRight} />LOGIN</Button>

                <Button id="confirmUserButton" variant='contained' color="primary" style={{ width: "150px", height: "50px" }} onClick={
                    async () => {
                        nav('/Corona/CreateUser');
                    }
                }><FontAwesomeIcon icon={faAtom} />ENLIST</Button>

                <div style={{ height: "50px", display: "flex", marginRight:"16px", border:"0px" }}>
                    <form action="https://www.paypal.com/donate" method="post" target="_top">
                        <input type="hidden" name="business" value="TWXJ467KP823E" />
                        <input type="hidden" name="no_recurring" value="0" />
                        <input type="hidden" name="item_name" value="Not so much a revolution and a government, but a tool to make them that comes with great samples." />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                </div>

            </div>
        </div>
    );
}
