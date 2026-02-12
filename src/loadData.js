export default function loadData() {
    const json = localStorage.getItem('saveData');
    const data = JSON.parse(json);
    console.log(`Data has been loaded from localStorage`);
    return data;
}