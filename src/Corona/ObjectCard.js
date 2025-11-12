
export default function ObjectCard(props) {

    let card_title = '';
    let card_fields = [];
    let card_field = {};
    let name = '';

    if (props.classDef) {
        if (props.classDef.card_fields) {            

            const nameFields = props.classDef.card_fields || [];
            nameFields.forEach(nf => {
                let field = props.classDef.fields[nf];
                let field_pretty = nf.hasOwnProperty("label") ? field.label : nf;
                card_field = { "name":field_pretty, "value":props.obj[nf]  };
                card_fields.push(card_field);
            });
        }
        else {
            const nameFields = Object.keys(props.obj).filter(key => key.endsWith("name") && key !== "class_name");
            nameFields.forEach(nf => {
                let field = props.classDef.fields[nf];
                let field_pretty = nf.hasOwnProperty("label") ? field.label : nf;
                card_field = { "name":field_pretty, "value":props.obj[nf]  };
                card_fields.push(card_field);
            });
        }

        return <table style={{border:"none"}}>
            <tbody>
            {props.classDef.card_title && props.classDef.card_title >'' &&
                <tr>
                    <td style={{fontWeight:"bold", paddingRight:"8px"}} colSpan="2">{props.obj[props.classDef.card_title]}</td>
                </tr>}
            {card_fields.map((cf, index) => {
                return <tr key={index}>
                    <td style={{ fontWeight:"normal", paddingRight:"8px"}}>{cf.name}</td>
                    <td style={{ fontWeight:"normal"}}>{cf.value}</td>
                </tr>
            })}
            </tbody>
        </table>;

    }
    else if (props.field >'') {
        return <p>{props.obj[props.field]}</p>;
    } 
    return <p>{props.obj[name] || (props.obj.class_name + " #" + props.obj.id)}</p>;
}
