let employes = [
    {
        id: 1,
        name: "amin zineddine",
        role: "manager",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "aminzineddine@gmail.com",
        phone: "0771040004",
        experiences: [
            {
                jobTitle: "Manager d'équipe",
                company: "Entreprise ABC",
                startDate: "2018",
                endDate: "2024"
            },
            {
                jobTitle: "Chef de projet",
                company: "Société XYZ",
                startDate: "2014",
                endDate: "2018"
            }
        ],
        location: null
    },
    {
        id: 2,
        name: "ilyas elgrech",
        role: "receptionist",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "jean.martin@worksphere.com",
        phone: "06 34 56 78 90",
        experiences: [
            {
                jobTitle: "Réceptionniste",
                company: "Hotel Plaza",
                startDate: "2020",
                endDate: "2023"
            },
            {
                jobTitle: "Agent d'accueil",
                company: "Entreprise X",
                startDate: "2018",
                endDate: "2020"
            }
        ],
        location: null
    },
    {
        id: 3,
        name: "oussama kara",
        role: "technician",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "sophie.laurent@worksphere.com",
        phone: "06 45 67 89 06",
        experiences: [
            {
                jobTitle: "Technicien IT",
                company: "Société Y",
                startDate: "2019",
                endDate: "2023"
            },
            {
                jobTitle: "Support technique",
                company: "Tech Solutions",
                startDate: "2017",
                endDate: "2019"
            }
        ],
        location: null
    },
    {
        id: 4,
        name: "achraf setar",
        role: "security",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "pierre.moreau@worksphere.com",
        phone: "06 56 78 90 12",
        experiences: [
            {
                jobTitle: "Agent de sécurité",
                company: "Securitas",
                startDate: "2018",
                endDate: "2023"
            },
            {
                jobTitle: "Agent de surveillance",
                company: "Vigilance SA",
                startDate: "2015",
                endDate: "2018"
            }
        ],
        location: null
    }
];

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

const validationRegex = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    jobTitle: /^[a-zA-ZÀ-ÿ\s\-]{2,50}$/,
    company: /^[a-zA-ZÀ-ÿ0-9\s\-&.,]{2,50}$/
};

const nonIntegrer = document.getElementById('nonIntegrer');
const addEmplBtn = document.getElementById('addEmplBtn');
const addEmplModal = document.getElementById('addEmplModal');
const profilz = document.getElementById('profilz');
const afecterEmployeeModal = document.getElementById('afecterEmployeeModal');
const form = document.getElementById('form');
const photoPreview = document.getElementById('photoPreview');
const employeePhotoInput = document.getElementById('employeePhoto');
const addExperience = document.getElementById('addExperience')
const experiencesContainer = document.getElementById('experiencesContainer');
const closeButtons = document.querySelectorAll('.closebtn');
const AddButtons = document.querySelectorAll('.addbtn');

function main() {
    zonePrincipal();
    employeDispo();
    updateZoneVisuals();

    addEmplBtn.addEventListener('click', () => {
        addEmplModal.style.display = 'flex';
    });

    employeePhotoInput.addEventListener('input', () => {
        const url = employeePhotoInput.value;
        if (url) {
            photoPreview.src = url;
            photoPreview.style.display = 'block';
        } else {
            photoPreview.style.display = 'none';
        }
    });

    addExperience.addEventListener('click', addExperienceField);

    form.addEventListener('submit', handleEmployesubmit);

    liveValidation();

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            addEmplModal.style.display = 'none';
            profilz.style.display = 'none';
            afecterEmployeeModal.style.display = 'none';
        });
    });

    AddButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const zone = e.target.getAttribute('data-zone');
            openafecterEmployeeModal(zone);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === addEmplModal) {
            addEmplModal.style.display = 'none';
        }
        if (e.target === profilz) {
            profilz.style.display = 'none';
        }
        if (e.target === afecterEmployeeModal) {
            afecterEmployeeModal.style.display = 'none';
        }
    });
}

function liveValidation() {
    const nameInput = document.getElementById('employeeName');
    const emailInput = document.getElementById('employeeEmail');
    const phoneInput = document.getElementById('employeePhone');
    const roleSelect = document.getElementById('employeeRole');

    nameInput.addEventListener('blur', () => validForm(nameInput, 'name'));
    
    emailInput.addEventListener('blur', () => validForm(emailInput, 'email'));
    phoneInput.addEventListener('blur', () => validForm(phoneInput, 'phone'));
    roleSelect.addEventListener('change', () => validForm(roleSelect, 'role'));

    experiencesContainer.addEventListener('blur', (e) => {
        if (e.target.classList.contains('job-title')) {
            validForm(e.target, 'jobTitle');
        } else if (e.target.classList.contains('company')) {
            validForm(e.target, 'company');
        }
    }, true);
}

function validForm(field, type) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    field.classList.remove('error');
    field.classList.remove('success');

    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    switch (type) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Le nom est requis';
            } else if (!validationRegex.name.test(value)) {
                isValid = false;
                errorMessage = 'Le nom doit contenir uniquement des lettres (2-50 caracteres)';
            }
            break;

        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'L\'email est requis';
            } else if (!validationRegex.email.test(value)) {
                isValid = false;
                errorMessage = 'Format d\'email invalide (ex: exemple@domaine.com)';
            }
            break;

        case 'phone':
            if (!value) {
                isValid = false;
                errorMessage = 'Le téléphone est requis';
            } else if (!validationRegex.phone.test(value)) {
                isValid = false;
                errorMessage = 'Format de téléphone invalide (ex: 06 12 34 56 78 ou +212 6 12 34 56 78)';
            }
            break;

        case 'role':
            if (!value) {
                isValid = false;
                errorMessage = 'Le rôle est requis';
            }
            break;

        case 'jobTitle':
            if (!value) {
                isValid = false;
                errorMessage = 'Le poste est requis';
            } else if (!validationRegex.jobTitle.test(value)) {
                isValid = false;
                errorMessage = 'Le poste doit contenir uniquement des lettres (2-50 caracteres)';
            }
            break;

        case 'company':
            if (!value) {
                isValid = false;
                errorMessage = 'L\'entreprise est requise';
            } else if (!validationRegex.company.test(value)) {
                isValid = false;
                errorMessage = 'Le nom d\'entreprise contient des caracteres invalides';
            }
            break;
    }

    if (!isValid) {
        field.classList.add('error');
        errorMsg(field, errorMessage);
    } else {
        field.classList.add('success');
    }

    return isValid;
}

function errorMsg(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ea4335';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
}

function checkValidateForm() {
    let isValid = true;

    const nameInput = document.getElementById('employeeName');
    const emailInput = document.getElementById('employeeEmail');
    const phoneInput = document.getElementById('employeePhone');
    const roleSelect = document.getElementById('employeeRole');

    if (!validForm(nameInput, 'name')) isValid = false;
    if (!validForm(emailInput, 'email')) isValid = false;
    if (!validForm(phoneInput, 'phone')) isValid = false;
    if (!validForm(roleSelect, 'role')) isValid = false;

    const jobTitleInputs = document.querySelectorAll('.job-title');
    const companyInputs = document.querySelectorAll('.company');
    const startDateInputs = document.querySelectorAll('.start-date');
    const endDateInputs = document.querySelectorAll('.end-date');

    for (let i = 0; i < jobTitleInputs.length; i++) {
        if (!validForm(jobTitleInputs[i], 'jobTitle')) isValid = false;
        if (!validForm(companyInputs[i], 'company')) isValid = false;

        const startDate = startDateInputs[i].value;
        const endDate = endDateInputs[i].value;

        if (!startDate) {
            isValid = false;
            startDateInputs[i].classList.add('error');
            errorMsg(startDateInputs[i], 'La date de début est requise');
        } else {
            startDateInputs[i].classList.remove('error');
        }

        if (!endDate) {
            isValid = false;
            endDateInputs[i].classList.add('error');
            errorMsg(endDateInputs[i], 'La date de fin est requise');
        } else {
            endDateInputs[i].classList.remove('error');
        }

        if (startDate && endDate && startDate > endDate) {
            isValid = false;
            endDateInputs[i].classList.add('error');
            errorMsg(endDateInputs[i], 'La date de fin doit être apres la date de début');
        }
    }

    return isValid;
}

function zonePrincipal() {
    principalZones.forEach(zoneId => {
        const zone = document.querySelector(`.zone[data-zone="${zoneId}"]`);
        if (zone) {
            zone.classList.add('principal-zone');
            const zoneEmployes = employes.filter(emp => emp.location === zoneId);
            if (zoneEmployes.length === 0) {
                zone.classList.add('empty');
            }
        }
    });
}

function employeDispo() {
    nonIntegrer.innerHTML = '';

    const unassignedEmployes = employes.filter(emp => emp.location === null);

    unassignedEmployes.forEach(employee => {
        const li = document.createElement('li');
        li.className = 'unassigned-item fade-in';
        li.setAttribute('data-id', employee.id);

        li.innerHTML = `
            <img src="${employee.photo}" alt="${employee.name}" class="employee-avatar">
            <div class="employee-info">
                <div class="employee-name">${employee.name}</div>
                <div class="employee-role">${getRoleLabel(employee.role)}</div>
            </div>
        `;

        li.addEventListener('click', () => {
            openEmployeeProfile(employee.id);
        });

        nonIntegrer.appendChild(li);
    });
}

function renderZoneEmployes(zoneId) {
    const zoneContent = document.getElementById(`${zoneId}-content`);
    zoneContent.innerHTML = '';

    const zoneEmployes = employes.filter(emp => emp.location === zoneId);

    zoneEmployes.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.className = 'zone-employee fade-in';
        employeeDiv.setAttribute('data-id', employee.id);

        employeeDiv.innerHTML = `
            <img src="${employee.photo}" alt="${employee.name}" class="employee-avatar">
            <div class="employee-info">
                <div class="employee-name">${employee.name}</div>
                <button class="remove-btn">×</button>
            </div>
        `;

        employeeDiv.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-btn')) {
                openEmployeeProfile(employee.id);
            }
        });

        const removeBtn = employeeDiv.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeEmployeeFromZone(employee.id);
        });

        zoneContent.appendChild(employeeDiv);
    });

    updateZoneVisual(zoneId);
}

function updateZoneVisual(zoneId) {
    const zone = document.querySelector(`.zone[data-zone="${zoneId}"]`);
    const zoneEmployes = employes.filter(emp => emp.location === zoneId);

    if (zoneEmployes.length === 0 && principalZones.includes(zoneId)) {
        zone.classList.add('empty');
    } else {
        zone.classList.remove('empty');
    }

    const addButton = zone.querySelector('.addbtn');
    if (zoneEmployes.length >= capacityZone[zoneId]) {
        addButton.style.display = 'none';
    } else {
        addButton.style.display = 'flex';
    }
}

function updateZoneVisuals() {
    Object.keys(employeZone).forEach(zoneId => {
        renderZoneEmployes(zoneId);
    });
}

function getRoleLabel(role) {
    const roleLabels = {
        receptionist: "Réceptionniste",
        technician: "Technicien IT",
        security: "Agent de sécurité",
        manager: "Manager",
        cleaner: "Nettoyage",
        other: "Autre"
    };

    return roleLabels[role] || role;
}

function addExperienceField() {
    const experienceCount = document.querySelectorAll('.experience-item').length + 1;
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';
    experienceItem.innerHTML = `
        <div class="experience-header">
            <div class="experience-title">Expérience #${experienceCount}</div>
            <button type="button" class="remove-experience-btn">×</button>
        </div>
        <div class="experience-fields">
            <div class="form-group">
                <input type="text" class="form-control job-title" placeholder="Poste" required>
            </div>
            <div class="form-group">
                <input type="text" class="form-control company" placeholder="Entreprise" required>
            </div>
            <div class="form-group">
                <input type="month" class="form-control start-date" placeholder="Date de début" required>
            </div>
            <div class="form-group">
                <input type="month" class="form-control end-date" placeholder="Date de fin" required>
            </div>
        </div>
    `;

    experiencesContainer.appendChild(experienceItem);

    const removeBtn = experienceItem.querySelector('.remove-experience-btn');
    removeBtn.addEventListener('click', () => {
        experiencesContainer.removeChild(experienceItem);
    });
}

function getDefaultPhoto() {
    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";


}

function handleEmployesubmit(e) {
    e.preventDefault();

    if (!checkValidateForm()) {
        alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
        return;
    }

    const name = document.getElementById('employeeName').value.trim();
    const role = document.getElementById('employeeRole').value;
    const photo = document.getElementById('employeePhoto').value || getDefaultPhoto();
    const email = document.getElementById('employeeEmail').value.trim();
    const phone = document.getElementById('employeePhone').value.trim();

    const experiences = [];
    const experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(item => {
        const jobTitle = item.querySelector('.job-title').value.trim();
        const company = item.querySelector('.company').value.trim();
        const startDate = item.querySelector('.start-date').value;
        const endDate = item.querySelector('.end-date').value;

        experiences.push({
            jobTitle,
            company,
            startDate,
            endDate
        });
    });

    const newEmployee = {
        id: employes.length > 0 ? Math.max(...employes.map(emp => emp.id)) + 1 : 1,
        name,
        role,
        photo,
        email,
        phone,
        experiences,
        location: null
    };

    employes.push(newEmployee);
    employeDispo();

    form.reset();
    photoPreview.style.display = 'none';
    experiencesContainer.innerHTML = `
        <div class="experience-item">
            <div class="experience-header">
                <div class="experience-title">Expérience #1</div>
                <button type="button" class="remove-experience-btn">×</button>
            </div>
            <div class="experience-fields">
                <div class="form-group">
                    <input type="text" class="form-control job-title" placeholder="Poste" required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control company" placeholder="Entreprise" required>
                </div>
                <div class="form-group">
                    <input type="month" class="form-control start-date" placeholder="Date de début" required>
                </div>
                <div class="form-group">
                    <input type="month" class="form-control end-date" placeholder="Date de fin" required>
                </div>
            </div>
        </div>
    `;

    const newRemoveBtn = experiencesContainer.querySelector('.remove-experience-btn');
    newRemoveBtn.addEventListener('click', () => {
        experiencesContainer.removeChild(experiencesContainer.querySelector('.experience-item'));
    });

    addEmplModal.style.display = 'none';
    alert('Employé ajouté avec succes!');
}

function openEmployeeProfile(employeeId) {
    const employee = employes.find(emp => emp.id === employeeId);
    if (!employee) return;

    document.getElementById('profileAvatar').src = employee.photo;
    document.getElementById('profileName').textContent = employee.name;
    document.getElementById('profileRole').textContent = getRoleLabel(employee.role);
    document.getElementById('profileEmail').textContent = employee.email;
    document.getElementById('profilePhone').textContent = employee.phone;

    const location = employee.location ?
        document.querySelector(`.zone[data-zone="${employee.location}"] .zone-title`).textContent :
        "Non assigné";
    document.getElementById('profileLocation').textContent = location;

    const experiencesList = document.getElementById('profileExperiences');
    experiencesList.innerHTML = '';

    employee.experiences.forEach(exp => {
        const li = document.createElement('li');
        const startDate = new Date(exp.startDate + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
        const endDate = new Date(exp.endDate + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
        li.textContent = `${exp.jobTitle} chez ${exp.company} (${startDate} - ${endDate})`;
        experiencesList.appendChild(li);
    });

    profilz.style.display = 'flex';
}

function openafecterEmployeeModal(zoneId) {
    const eligibleEmployes = employes.filter(emp =>
        emp.location === null &&
        employeZone[zoneId].includes(emp.role)
    );

    document.getElementById('assignZoneInfo').textContent =
        `Sélectionnez un employé à assigner à la ${document.querySelector(`.zone[data-zone="${zoneId}"] .zone-title`).textContent}:`;

    const employesList = document.getElementById('eligibleEmployesList');
    employesList.innerHTML = '';

    if (eligibleEmployes.length === 0) {
        employesList.innerHTML = '<li>Aucun employé éligible disponible</li>';
    } else {
        eligibleEmployes.forEach(employee => {
            const li = document.createElement('li');
            li.className = 'unassigned-item';
            li.setAttribute('data-id', employee.id);

            li.innerHTML = `
                <img src="${employee.photo}" alt="${employee.name}" class="employee-avatar">
                <div class="employee-info">
                    <div class="employee-name">${employee.name}</div>
                    <div class="employee-role">${getRoleLabel(employee.role)}</div>
                </div>
            `;

            li.addEventListener('click', () => {
                assignEmployeeToZone(employee.id, zoneId);
                afecterEmployeeModal.style.display = 'none';
            });

            employesList.appendChild(li);
        });
    }

    afecterEmployeeModal.style.display = 'flex';
}

function assignEmployeeToZone(employeeId, zoneId) {
    const employee = employes.find(emp => emp.id === employeeId);
    if (!employee) return;

    employee.location = zoneId;
    employeDispo();
    renderZoneEmployes(zoneId);
}

function removeEmployeeFromZone(employeeId) {
    const employee = employes.find(emp => emp.id === employeeId);
    if (!employee) return;

    const previousZone = employee.location;
    employee.location = null;

    employeDispo();
    renderZoneEmployes(previousZone);
}

function handleMobileRotation() {
    const rotationMessage = document.getElementById('rotationMessage');
    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
        const isPortrait = window.innerHeight > window.innerWidth;

        if (isPortrait) {
            rotationMessage.classList.add('show');
        } else {
            rotationMessage.classList.remove('show');
        }
    } else {
        rotationMessage.classList.remove('show');
    }
}

window.addEventListener('resize', handleMobileRotation);
window.addEventListener('orientationchange', handleMobileRotation);

document.addEventListener('DOMContentLoaded', () => {
    main();
    handleMobileRotation();
});

    
// function compteurExperience(a){
//     const E = [];
//     let b ;
//     for(let i = 0 ; i < employes[a].experiences.length; i++){
//         let dateDebut = parseInt(employes[a].experiences[i].startDate);
//         let datefin = parseInt(employes[a].experiences[i].endDate);

//          b = datefin - dateDebut;

//         E[E.length] = b;
//     }

//     return E;
// }

// console.log(compteurExperience(1));














