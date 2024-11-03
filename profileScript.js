
        const profileImage = document.getElementById("profileImage");
        const uploadImage = document.getElementById("uploadImage");
    
        const editButton = document.getElementById("editButton");
        const body = document.body;
    
        window.onload = loadDataFromStorage;
    
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
                    localStorage.setItem("profileImage", reader.result); 
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
    
            const username = document.getElementById("usernameInput").value || "No information entered";
            const email = document.getElementById("emailInput").value || "No information entered";
            const diet = document.getElementById("diet").value || "No information entered";
            const allergies = document.getElementById("allergies").value || "No information entered";
            const favoriteCuisines = document.getElementById("favoriteCuisines").value || "No information entered";
            const dislikedIngredients = document.getElementById("dislikedIngredients").value || "No information entered";
            const cookingSkill = document.getElementById("skill").value || "No information entered";
            const kitchenTools = document.getElementById("kitchenTools").value || "No information entered";
    
            const selectedPreferences = Array.from(document.querySelectorAll("input[name='mealPreference']:checked"))
                .map(el => document.querySelector(`label[for="${el.id}"]`).textContent.trim())
                .join(", ") || "No information entered";
    
            document.getElementById("usernameDisplay").textContent = username;
            document.getElementById("emailDisplay").textContent = email;
            document.getElementById("dietDisplay").textContent = diet;
            document.getElementById("allergiesDisplay").textContent = allergies;
            document.getElementById("favoriteCuisinesDisplay").textContent = favoriteCuisines;
            document.getElementById("dislikedIngredientsDisplay").textContent = dislikedIngredients;
            document.getElementById("cookingSkillDisplay").textContent = cookingSkill.charAt(0).toUpperCase() + cookingSkill.slice(1);
            document.getElementById("kitchenToolsDisplay").textContent = kitchenTools;
            document.getElementById("mealPrefDisplay").textContent = selectedPreferences;
    
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("diet", diet);
            localStorage.setItem("allergies", allergies);
            localStorage.setItem("favoriteCuisines", favoriteCuisines);
            localStorage.setItem("dislikedIngredients", dislikedIngredients);
            localStorage.setItem("cookingSkill", cookingSkill);
            localStorage.setItem("kitchenTools", kitchenTools);
            localStorage.setItem("mealPreferences", selectedPreferences);
    
            document.getElementById("mealPrefDisplay").classList.remove("hidden");
            document.getElementById("meal").classList.add("hidden");
    
            document.querySelectorAll("span").forEach(span => span.classList.remove("hidden"));
            document.querySelectorAll("input, select").forEach(el => el.classList.add("hidden"));
    
            editButton.textContent = "Edit";
        }
    
        function loadDataFromStorage() {
            document.getElementById("usernameDisplay").textContent = localStorage.getItem("username") || "No information entered";
            document.getElementById("emailDisplay").textContent = localStorage.getItem("email") || "No information entered";
            document.getElementById("dietDisplay").textContent = localStorage.getItem("diet") || "No information entered";
            document.getElementById("allergiesDisplay").textContent = localStorage.getItem("allergies") || "No information entered";
            document.getElementById("favoriteCuisinesDisplay").textContent = localStorage.getItem("favoriteCuisines") || "No information entered";
            document.getElementById("dislikedIngredientsDisplay").textContent = localStorage.getItem("dislikedIngredients") || "No information entered";
            document.getElementById("cookingSkillDisplay").textContent = localStorage.getItem("cookingSkill") || "No information entered";
            document.getElementById("kitchenToolsDisplay").textContent = localStorage.getItem("kitchenTools") || "No information entered";
            document.getElementById("mealPrefDisplay").textContent = localStorage.getItem("mealPreferences") || "No information entered";
    
            const savedProfileImage = localStorage.getItem("profileImage");
            if (savedProfileImage) {
                profileImage.src = savedProfileImage;
            }
        }
    
        function closeModal() {
            document.getElementById("infoModal").style.display = "none";
            document.getElementById("overlay").style.display = "none";
        }
