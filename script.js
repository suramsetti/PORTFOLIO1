// LocalStorage helpers
function saveData(formId, keys) {
  const data = {};
  keys.forEach(key => {
    const el = document.getElementById(key);
    if (el) data[key] = el.value;
  });
  localStorage.setItem(formId, JSON.stringify(data));
}

function loadData(formId, keys) {
  const data = JSON.parse(localStorage.getItem(formId));
  if (data) {
    keys.forEach(key => {
      const el = document.getElementById(key);
      if (el && data[key]) el.value = data[key];
    });
  }
}

// About Me
function previewAbout() {
  const aboutText = document.getElementById("aboutText").value.trim();
  if (!aboutText) {
    alert("Please write something about yourself.");
    return;
  }
  saveData("aboutForm", ["aboutText"]);
  document.getElementById("preview").innerHTML = `<h3>About Me:</h3><p>${aboutText.replace(/\n/g, "<br>")}</p>`;
}

// Skills
function previewSkills() {
  const skills = document.getElementById("skillsText").value.trim();
  if (!skills) {
    alert("Please enter at least one skill.");
    return;
  }
  saveData("skillsForm", ["skillsText"]);
  document.getElementById("skillsPreview").innerHTML = `<h3>Skills:</h3><ul>${skills.split('\n').map(s => `<li>${s}</li>`).join('')}</ul>`;
}

// Projects
function previewProjects() {
  const projects = document.getElementById("projectText").value.trim();
  if (!projects) {
    alert("Please enter project details.");
    return;
  }
  saveData("projectsForm", ["projectText"]);
  document.getElementById("projectsPreview").innerHTML = `<h3>Projects:</h3><p>${projects.replace(/\n/g, "<br>")}</p>`;
}

function previewAchievements() {
  const achievementText = document.getElementById("achievementText").value.trim();

  if (!achievementText) {
    alert("Please enter your achievements.");
    return;
  }

  // Split by newline or comma for multiple entries
  const achievementsArray = achievementText
    .split(/\n|,/)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  // Store in localStorage
  localStorage.setItem("achievementsData", JSON.stringify(achievementsArray));

  // Display preview
  const previewDiv = document.getElementById("achievementsPreview");
  previewDiv.innerHTML = "<h3>Preview:</h3><ul>" +
    achievementsArray.map(a => `<li>${a}</li>`).join('') +
    "</ul>";
}


// Contact validation and preview
function validateContactForm() {
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email.");
    return false;
  }
  if (!phone || phone.length < 10) {
    alert("Please enter a valid phone number.");
    return false;
  }
  return true;
}
// Replace "Your Name" in footer with actual name
const storedName = localStorage.getItem("userName");
if (storedName) {
  document.getElementById("footerName").textContent = storedName;
}

function previewContact() {
  if (!validateContactForm()) return;
  saveData("contactForm", ["email", "phone", "linkedin", "github"]);
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;

  document.getElementById("contactPreview").innerHTML = `
    <h3>Contact Info:</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
    <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
  `;
}

// Load data on page load
document.addEventListener("DOMContentLoaded", () => {
  const pageId = document.body.id;
  switch (pageId) {
    case "aboutPage":
      loadData("aboutForm", ["aboutText"]);
      break;
    case "skillsPage":
      loadData("skillsForm", ["skillsText"]);
      break;
    case "projectsPage":
      loadData("projectsForm", ["projectText"]);
      break;
    case "achievementsPage":
      loadData("achievementsForm", ["achievementText"]);
      break;
    case "contactPage":
      loadData("contactForm", ["email", "phone", "linkedin", "github"]);
      break;
  }
});

// Print / Download Resume
function printResume() {
  window.print();
}
