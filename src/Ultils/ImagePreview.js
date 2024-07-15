export const setPreview = (File, setPicked_Image) => {
    ReadBinary(File, (result) => {
        setPicked_Image(result);
    });
}

const ReadBinary = (File, DataURL) => {
    var Reader = new FileReader();
    if (File) {
        Reader.readAsDataURL(File);
    }
    Reader.onload = () => {
        DataURL(Reader.result);
    }
}