import React from 'react';
import { useNavigate } from "react-router";

export default function Card(props)
{
    let nav = useNavigate();
    return (
        <div className="card" style={{
            width: props.width ?? "90%",
            height: props.height ?? "450px",
            display: "grid",
            gridTemplateColumns: "250px 1.0fr",
            gridTemplateRows: "75px 1.0fr 80px",
            backgroundColor:"#FFFFFF",
            borderRadius:"8px"
                   }}>
            <div style={{ gridColumn: "1/ span 2", gridRow: "1", border:"1px solid green" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", paddingLeft: "16px", paddingTop: "8px" }}>{props.title}</div>
            </div>
            <div style={{ gridColumn: "1", gridRow: "2", border: "1px solid green" }}>
                <img src={props.image} style={{ width: "100%", height: "100%" }} alt={props.title} />
            </div>
            <div style={{ gridColumn: "2", gridRow: "2", border: "1px solid green", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"near", padding:"16px", overflowY:"auto" }}>
                {props.children}
            </div>
            <div style={{ gridColumn: "1 / span 2", gridRow: "3", border: "1px solid green", display:"flex", flexDirection:"row" }}>
                <div style={{ width: "250px", display: "flex" }}>
                    <form action="https://www.paypal.com/donate" method="post" target="_top">
                        <input type="hidden" name="business" value="TWXJ467KP823E" />
                        <input type="hidden" name="no_recurring" value="0" />
                        <input type="hidden" name="item_name" value="Not so much a revolution and a government, but a tool to make them that comes with great samples." />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                </div>
                <button id="confirmUserButton" style={{ width:"150px", height:"50px" }} onClick={
                    async () => {
                        nav('/Revolution/Login');
                    }
                }>LOGIN</button>

                <button id="confirmUserButton" style={{ width: "150px", height: "50px" }} onClick={
                    async () => {
                        nav('/Revolution/CreateUser');
                    }
                }>ENLIST</button>

            </div>
        </div>
    );
}
