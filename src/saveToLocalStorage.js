export default function saveToLocalStorage(data) {
    console.log('saveToLocalStorage received data:', {data});
    const json = JSON.stringify(data);
    localStorage.setItem('saveData', json);
    console.log(`Data has been saved to localStorage`);
}