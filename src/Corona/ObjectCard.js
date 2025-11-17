import React from "react";
export default function ObjectCard(props) {

    let card_fields = [];
    let card_field = {};
    let name = '';

    if (props.classDef) {
        if (props.classDef.card_fields) {            

            const nameFields = props.classDef.card_fields || [];
            nameFields.forEach(nf => {
                let field = props.classDef.fields[nf];
                let field_pretty = nf.hasOwnProperty("label") ? field.label : nf;
                card_field = { "name":field_pretty, "value":props.obj[nf]?.toString()  };
                card_fields.push(card_field);
            });
        }
        else {
            const nameFields = Object.keys(props.obj).filter(key => key.endsWith("name") && key !== "class_name");
            nameFields.forEach(nf => {
                let field = props.classDef.fields[nf];
                let field_pretty = nf.hasOwnProperty("label") ? field.label : nf;
                card_field = { "name":field_pretty, "value":props.obj[nf]?.toString()  };
                card_fields.push(card_field);
            });
        }

        if (props.layout === "horizontal")
        {
            return <h3 style={{ backgroundColor: "var(--rock1)", padding:"8px", color:"white" }}>
                <div>
                    {props.classDef.card_title && props.classDef.card_title > '' &&
                        <span style={{ fontWeight: "bold", paddingRight: "8px", textAlign: "left" }}>{props.obj[props.classDef.card_title]}</span>
                     }
                    {card_fields.map((cf, index) =>
                        <span key={index}  style={{ paddingRight:"16px", fontWeight: "bold", textAlign: "left" }}>{cf.value}</span>
                    )}
                </div>
            </h3>;          
        }
        else {
            return <table style={{border:"none"}}>
                <tbody>
                {props.classDef.card_title && props.classDef.card_title >'' &&
                    <tr>
                        <td style={{fontWeight:"bold", paddingRight:"8px", textAlign:"left"}} colSpan="2" >{props.obj[props.classDef.card_title]}</td>
                    </tr>}
                {card_fields.map((cf, index) => {
                    return <tr key={index}>
                        <td style={{ fontWeight:"normal", paddingRight:"8px", textAlign:"left"}}>{cf.name}</td>
                        <td style={{ fontWeight:"normal", textAlign:"left"}}>{cf.value}</td>
                    </tr>
                })}
                </tbody>
            </table>;
        }

    }
    else if (props.field >'') {
        return <p>{props.obj[props.field]}</p>;
    } 
    return <p>{props.obj[name] || (props.obj.class_name + " #" + props.obj.id)}</p>;
}
