
function zainZoom(){
    document.getElementById("zain").src = "f48b9e7c9b797927757e24f0afddcfaf.jpg"
}
function zainOutZoom(){
    document.getElementById("zain").src = "zain_cropped.PNG"
}
/*
function test(){
    const address = '127.0.0.1'   
    const port = 5000
    const getData = async() =>{
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

    getData().then((json) => { console.log(json); })

}
*/

// script.js

// Sample data (this will be replaced with the actual data fetched from the CSV or API)

const data = [
    { Code: "100-1-15193", EventName: "Band", Title: "Bartok Suite", Composer: "Bartok", Arranger: "Clark", Publisher: "Belwin, Inc", Grade: 1, Specification: "" },
    { Code: "100-1-15194", EventName: "Band", Title: "Allegretto (from Symphony No. 7)", Composer: "Beethoven", Arranger: "Court", Publisher: "Curnow Music", Grade: 1, Specification: "" },
    { Code: "100-1-15198", EventName: "Band", Title: "Theme and Variations", Composer: "Broege", Arranger: "", Publisher: "Manhattan Beach Music", Grade: 1, Specification: "" },
    { Code: "100-1-15200", EventName: "Band", Title: "La Volta", Composer: "Byrd", Arranger: "Fenske", Publisher: "Daehn Publications", Grade: 1, Specification: "" },
    { Code: "100-1-15202", EventName: "Band", Title: "Danse Pavane", Composer: "Cacavas", Arranger: "", Publisher: "Bourne, Co.", Grade: 1, Specification: "" },
    { Code: "100-1-15203", EventName: "Orchestra", Title: "Symphony No. 5", Composer: "Shostakovich", Arranger: "Smith", Publisher: "EMI", Grade: 5, Specification: "Full Score" },
    { Code: "100-1-15204", EventName: "Band", Title: "Canon in D", Composer: "Pachelbel", Arranger: "Clark", Publisher: "Belwin, Inc", Grade: 2, Specification: "" },
    { Code: "100-1-15205", EventName: "Choir", Title: "Ave Maria", Composer: "Schubert", Arranger: "Jones", Publisher: "Oxford", Grade: 4, Specification: "" },
    // Add more sample data here for testing...
];



// Function to filter and display the data
function filterData() {
    const eventName = document.getElementById('eventName').value.toLowerCase();
    const title = document.getElementById('title').value.toLowerCase();
    const composer = document.getElementById('composer').value.toLowerCase();
    const arranger = document.getElementById('arranger').value.toLowerCase();
    const grade = document.getElementById('grade').value;

    const filteredData = data.filter(item => {
        return (!eventName || item.EventName.toLowerCase().includes(eventName)) &&
               (!title || item.Title.toLowerCase().includes(title)) &&
               (!composer || item.Composer.toLowerCase().includes(composer)) &&
               (!arranger || item.Arranger.toLowerCase().includes(arranger)) &&
               (!grade || item.Grade == grade);
    });

    displayData(filteredData);
}

// Function to display the data in the table
function displayData(data) {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = ''; // Clear previous results

    data.forEach(item => {
        const row = `<tr>
            <td><input type="checkbox" onchange="showRelatedPieces(this)" data-code="${item.Code}" data-grade="${item.Grade}" data-arranger="${item.Arranger}"></td>
            <td>${item.Code}</td>
            <td>${item.EventName}</td>
            <td>${item.Title}</td>
            <td>${item.Composer}</td>
            <td>${item.Arranger}</td>
            <td>${item.Publisher}</td>
            <td>${item.Grade}</td>
            <td>${item.Specification}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// Function to show related pieces based on the selected piece's grade and arranger
function showRelatedPieces(checkbox) {
    const selectedCode = checkbox.getAttribute('data-code');
    const selectedGrade = parseInt(checkbox.getAttribute('data-grade'));
    const selectedArranger = checkbox.getAttribute('data-arranger').toLowerCase();

    const relatedData = data.filter(item => {
        return (item.Grade === selectedGrade - 1 || item.Grade === selectedGrade + 1) &&
               item.Arranger.toLowerCase() === selectedArranger &&
               item.Code !== selectedCode;
    });

    displayRelatedData(relatedData);
}

// Function to display related pieces in the related table
function displayRelatedData(data) {
    const tbody = document.querySelector('#relatedTable tbody');
    tbody.innerHTML = ''; // Clear previous results

    data.forEach(item => {
        const row = `<tr>
            <td>${item.Code}</td>
            <td>${item.EventName}</td>
            <td>${item.Title}</td>
            <td>${item.Composer}</td>
            <td>${item.Arranger}</td>
            <td>${item.Publisher}</td>
            <td>${item.Grade}</td>
            <td>${item.Specification}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// Function to reset the form
function resetForm() {
    document.getElementById('filterForm').reset();
    document.querySelector('#relatedTable tbody').innerHTML = ''; // Clear related pieces table
    displayData(data); // Display all data
}

// Initially display all data
displayData(data);
filterData();