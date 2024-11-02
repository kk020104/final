const profileImage = document.getElementById("profileImage");
const uploadImage = document.getElementById("uploadImage");

const editButton = document.getElementById("editButton");
const body = document.body;

profileImage.addEventListener("click", () => {
    if (body.classList.contains("edit-mode")) {
        uploadImage.click();
    }
});

uploadImage.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.addEventListener("load", function () {
            profileImage.src = reader.result;
        });
        
        reader.readAsDataURL(file);
    }
});

editButton.addEventListener("click", () => {
    if (editButton.textContent === "Edit") {
        enterEditMode();
    } else {
        saveAndExitEditMode();
    }
});

function enterEditMode() {
    body.classList.add("edit-mode");

    document.querySelectorAll("span").forEach(span => span.classList.add("hidden"));
    document.querySelectorAll("input, select").forEach(el => el.classList.remove("hidden"));

    document.getElementById("mealPrefDisplay").classList.add("hidden");
    document.getElementById("meal").classList.remove("hidden");

    editButton.textContent = "Save";
}

function saveAndExitEditMode() {
    body.classList.remove("edit-mode");

    document.getElementById("usernameDisplay").textContent = document.getElementById("usernameInput").value || "No information entered";
    document.getElementById("emailDisplay").textContent = document.getElementById("emailInput").value || "No information entered";
    document.getElementById("dietDisplay").textContent = document.getElementById("diet").value || "No information entered";
    document.getElementById("allergiesDisplay").textContent = document.getElementById("allergies").value || "No information entered";
    document.getElementById("favoriteCuisinesDisplay").textContent = document.getElementById("favoriteCuisines").value || "No information entered";
    document.getElementById("dislikedIngredientsDisplay").textContent = document.getElementById("dislikedIngredients").value || "No information entered";
    
    const cookingSkill = document.getElementById("skill").value || "No information entered";
    document.getElementById("cookingSkillDisplay").textContent = cookingSkill.charAt(0).toUpperCase() + cookingSkill.slice(1);

    document.getElementById("kitchenToolsDisplay").textContent = document.getElementById("kitchenTools").value || "No information entered";

    const selectedPreferences = Array.from(document.querySelectorAll("input[name='mealPreference']:checked"))
        .map(el => document.querySelector(`label[for="${el.id}"]`).textContent.trim())
        .join(", ") || "No information entered";
    document.getElementById("mealPrefDisplay").textContent = selectedPreferences;

    document.getElementById("mealPrefDisplay").classList.remove("hidden");
    document.getElementById("meal").classList.add("hidden");

    document.querySelectorAll("span").forEach(span => span.classList.remove("hidden"));
    document.querySelectorAll("input, select").forEach(el => el.classList.add("hidden"));

    editButton.textContent = "Edit";
}

function closeModal() {
    document.getElementById("infoModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
