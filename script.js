const packages = [
  { name:"Paris Getaway", price:75000, image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
  { name:"Tokyo Adventure", price:85000, image:"https://images.unsplash.com/photo-1549692520-acc6669e2f0c" },
  { name:"Dubai Luxury", price:65000, image:"https://images.unsplash.com/photo-1518684079-3c830dcef090" },
  { name:"Maldives Escape", price:90000, image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name:"New York Trip", price:70000, image:"https://images.unsplash.com/photo-1490578474895-699cd4e2cf59" },
  { name:"London Explorer", price:78000, image:"https://images.unsplash.com/photo-1473959383416-cf2f6fc7f2a5" },
  { name:"Switzerland Alps", price:88000, image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  { name:"Bali Retreat", price:60000, image:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { name:"Singapore City", price:72000, image:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd" },
  { name:"Rome Heritage", price:76000, image:"https://images.unsplash.com/photo-1529260830199-42c24126f198" },
  { name:"Thailand Beach", price:55000, image:"https://images.unsplash.com/photo-1505731132164-cca6f8a4d6b1" },
  { name:"Canada Mountains", price:82000, image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { name:"Australia Sydney", price:92000, image:"https://images.unsplash.com/photo-1506973035872-a4f23efbcb9e" },
  { name:"Iceland Northern Lights", price:98000, image:"https://images.unsplash.com/photo-1482192505345-5655af888cc4" },
  { name:"Greece Santorini", price:87000, image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
];

document.addEventListener("DOMContentLoaded", ()=>{
    displayPackages(packages);
    populateSelect();
    displayReservations();
});

// Display packages
function displayPackages(data){
    const container=document.getElementById("packageList");
    container.innerHTML="";
    data.forEach((pkg,index)=>{
        container.innerHTML+=`
        <div class="package-card">
            <img src="${pkg.image}" alt="${pkg.name}" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e'">
            <h3>${pkg.name}</h3>
            <p class="price">₹${pkg.price}</p>
            <button onclick="openBookingModal(${index})">Book Now</button>
        </div>`;
    });
}

// Populate select in booking form
function populateSelect(){
    const select=document.getElementById("packageSelect");
    packages.forEach(pkg=>{
        const option=document.createElement("option");
        option.value=pkg.name;
        option.textContent=pkg.name;
        select.appendChild(option);
    });
}

// Booking modal
const modal=document.getElementById("bookingModal");
const closeModal=document.getElementById("closeModal");
closeModal.onclick=()=>{ modal.style.display="none"; }

function openBookingModal(index){
    const pkg=packages[index];
    document.getElementById("packageSelect").value=pkg.name;
    modal.style.display="block";
}

// Book trip
document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name=document.getElementById("name").value;
    const selectedPackage=document.getElementById("packageSelect").value;
    const date=document.getElementById("date").value;
    const reservation={id:Date.now(), name, selectedPackage, date};
    let reservations=JSON.parse(localStorage.getItem("reservations"))||[];
    reservations.push(reservation);
    localStorage.setItem("reservations",JSON.stringify(reservations));
    displayReservations();
    modal.style.display="none";
    e.target.reset();
    alert("Booking Confirmed!");
});

// Display reservations
function displayReservations(){
    const list=document.getElementById("reservationList");
    list.innerHTML="";
    let reservations=JSON.parse(localStorage.getItem("reservations"))||[];
    reservations.forEach(res=>{
        list.innerHTML+=`
        <div class="reservation-item">
            ${res.name} - ${res.selectedPackage} (${res.date})
            <button onclick="cancelReservation(${res.id})">Cancel</button>
        </div>`;
    });
}

// Cancel reservation
function cancelReservation(id){
    let reservations=JSON.parse(localStorage.getItem("reservations"))||[];
    reservations=reservations.filter(r=>r.id!==id);
    localStorage.setItem("reservations",JSON.stringify(reservations));
    displayReservations();
}

// Search filter
document.getElementById("searchInput").addEventListener("input",(e)=>{
    const value=e.target.value.toLowerCase();
    displayPackages(packages.filter(pkg=>pkg.name.toLowerCase().includes(value)));
});

// Price filter
document.getElementById("priceFilter").addEventListener("change",(e)=>{
    const value=e.target.value;
    let filtered=packages;
    if(value==="low") filtered=packages.filter(p=>p.price<50000);
    if(value==="mid") filtered=packages.filter(p=>p.price>=50000 && p.price<=80000);
    if(value==="high") filtered=packages.filter(p=>p.price>80000);
    displayPackages(filtered);
});

// Dark mode
document.getElementById("darkModeToggle").addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
});
