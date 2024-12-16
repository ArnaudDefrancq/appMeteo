export const fetchData = async(lat, lon) => {
    let allData;
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b84b80ae0c57bc15b8e5f37f1fb69e61`)
        .then((res) => res.json())
        .then((data) => {            
            return (allData = data)
        })
        .catch(err => console.log('Pb get info ' + err));
    return allData
}