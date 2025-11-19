




const employeZone = {
    reception: ["receptionist", "manager"],
    server: ["technician", "manager"],
    security: ["security", "manager"],
    conference: ["receptionist", "technician", "security", "manager", "cleaner", "other"],
    staff: ["receptionist", "technician", "security", "manager", "cleaner", "other"],
    archive: ["receptionist", "technician", "security", "manager", "other"]
};

const capacityZone = {
    reception: 2,
    server: 3,
    security: 2,
    conference: 10,
    staff: 8,
    archive: 2
};


const principalZones = ["reception", "server", "security"];

const unassignedList = document.getElementById('unassignedList')
const addEmployeeBtn = document.getElementById('addEmployeeBtn')
const addEmployeeModal = document.getElementById('addEmployeeModal')
const employeeProfileModal = document.getElementById('employeeProfileModal')
const assignEmployeeModal = document.getElementById('assignEmployeeModal')
const employeeForm = document.getElementById('employeeForm')
const photoPreview = document.getElementById('photoPreview')
const employeePhotoInput = document.getElementById('employeePhoto')
const addExperienceBtn = document.getElementById('addExperienceBtn')
const experiencesContainer = document.getElementById('experiencesContainer')
const closeButtons = document.querySelectorAll('.close-btn')
const zoneAddButtons = document.querySelectorAll('.zone-add-btn');

