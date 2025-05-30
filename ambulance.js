function startBooking() {
    const phone = document.getElementById('phoneNumber').value;
    if (phone.length !== 10) {
        showToast('Please enter a valid 10-digit number!');
        return;
    }

    document.getElementById('map').style.display = 'block';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showHospitals);
    } else {
        showToast("Geolocation is not supported!");
    }
}

function showHospitals(position) {
    const { latitude, longitude } = position.coords;

    const map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const hospitals = [
        { name: "City Care Hospital", lat: latitude + 0.005, lng: longitude + 0.005 },
        { name: "LifeLine Emergency", lat: latitude - 0.004, lng: longitude - 0.004 },
        { name: "MediQuick Hospital", lat: latitude + 0.007, lng: longitude - 0.002 }
    ];

    hospitals.forEach(hospital => {
        L.marker([hospital.lat, hospital.lng]).addTo(map)
            .bindPopup(hospital.name)
            .openPopup();
    });

    const list = document.getElementById('hospitalList');
    list.innerHTML = `<h3>Select Hospital:</h3>`;

    hospitals.forEach(hospital => {
        const btn = document.createElement('button');
        btn.innerText = hospital.name;
        btn.onclick = () => {
            const arrivalTime = Math.floor(Math.random() * 10) + 5;
            showToast(`Ambulance booked from ${hospital.name}. Arrival in ${arrivalTime} mins!`);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2500); // Redirect after 2.5 sec
        };
        btn.style.margin = "10px";
        list.appendChild(btn);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}
