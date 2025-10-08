
export default function NameOfObject(obj) {
    const nameFields = Object.keys(obj)
    .filter(key => key.endsWith("name") && key !== "class_name")
    .reduce((result, key) => {
        result[key] = obj[key];
        return result;
    }, {});
    let name = Object.values(nameFields).join(" ");
    return name;
}
