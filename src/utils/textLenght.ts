export default function trimLength(text: string) {
    if (text.length > 40) {
        return `${text.split(" ").slice(0, 12).join(" ")}....`
    } else {
        return text
    }
}