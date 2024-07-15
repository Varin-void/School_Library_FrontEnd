export default function CheckError(List_String) {
    let i = 0;
    List_String.forEach(item => {
        if (item === "" || item === null || item === undefined) {
            i++;
        }
    })
    return i;
}
