
export default function NameOfObject(obj, field) {

    let name = '';
    if (field >'') {
        name = obj[field];
    } 
    else 
    {
        const nameFields = Object.keys(obj)
        .filter(key => key.endsWith("name") && key !== "class_name");
        name = nameFields[0];
    }
    return name;
}
