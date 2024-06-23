function zainZoom(){
    document.getElementById("zain").src = "f48b9e7c9b797927757e24f0afddcfaf.jpg"
}
function zainOutZoom(){
    document.getElementById("zain").src = "zain_cropped.PNG"
}

function test(){
    const address = '127.0.0.1'   
    const port = 5000
    const fetch = async() =>{
        const response = await fetch(
            `http://${address}:${port}/api/0`,
            {
                method: "GET",
                headers: {
                        "Content-Type":"application/json"
                }
            }
        );
        return await response.json();
    }

    fetch().then((json) => { console.log(json); })

}

