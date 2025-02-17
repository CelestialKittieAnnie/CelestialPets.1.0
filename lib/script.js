const cooldownTime = 60 * 60 * 1000; // 1 hour in milliseconds
const agingInterval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
const baseMutationProbability = 0.1; // Base probability for a mutation

const player = {
    pets: [
        { name: 'Pet 1', image: 'path/to/pet1_image.jpg', gender: 'male' },
        { name: 'Pet 2', image: 'path/to/pet2_image.jpg', gender: 'female' },
        // Add more pets as needed
    ],
    eggs: [
        { name: 'Egg 1', image: 'path/to/egg1_image.jpg', hatchTime: new Date(Date.now() + 3600000) }, // 1 hour from now
        { name: 'Egg 2', image: 'path/to/egg2_image.jpg', hatchTime: new Date(Date.now() + 7200000) }, // 2 hours from now
        // Add more eggs as needed
    ]
};

const pets = {
    parent1: { name: 'Parent 1', ancestry: { parents: ['grandparent1', 'grandparent2'] } },
    parent2: { name: 'Parent 2', ancestry: { parents: ['grandparent3', 'grandparent4'] } },
    grandparent1: { name: 'Grandparent 1', ancestry: { parents: ['greatGrandparent1', 'greatGrandparent2'] } },
    grandparent2: { name: 'Grandparent 2', ancestry: { parents: ['greatGrandparent3', 'greatGrandparent4'] } },
    grandparent3: { name: 'Grandparent 3', ancestry: { parents: ['greatGrandparent5', 'greatGrandparent6'] } },
    grandparent4: { name: 'Grandparent 4', ancestry: { parents: ['greatGrandparent7', 'greatGrandparent8'] } },
    // Add more ancestors as needed
};

const mutations = {
    tails: ['Short Tail', 'Long Tail', 'Curly Tail'],
    wings: ['None', 'Small Wings', 'Large Wings'],
    patterns: ['Spots', 'Stripes', 'Solid'],
    traits: ['Horn', 'Fur', 'Scales']
};

function populateDropdowns() {
    const parent1Dropdown = document.getElementById('parent1');
    const parent2Dropdown = document.getElementById('parent2');

    player.pets.forEach(pet => {
        if (pet.gender == 'male') {
            const option1 = document.createElement('option');
            option1.value = pet.name;
            option1.textContent = pet.name;
            parent1Dropdown.appendChild(option1);
        } else if (pet.gender == 'female') {
            const option2 = document.createElement('option');
            option2.value = pet.name;
            option2.textContent = pet.name;
            parent2Dropdown.appendChild(option2);
        }
    });
}

function updateParentImage(parent) {
    const selectedPetName = document.getElementById(parent).value;
    const selectedPet = player.pets.find(pet => pet.name == selectedPetName);
    document.getElementById(`${parent}Image`).src = selectedPet.image;
}

function breedPets() {
    const parent1 = document.getElementById('parent1').value;
    const parent2 = document.getElementById('parent2').value;

    if (isOnCooldown(parent1) || isOnCooldown(parent2)) {
        alert('One or both parents are on cooldown. Please wait before breeding again.');
        return;
    }

    if (isInbreeding(parent1, parent2)) {
        alert('Inbreeding detected! Please choose different parents.');
        return;
    }

    const offspring = {
        name: 'New Pet',
        genetics: combineGenetics(parent1, parent2),
        ancestry: {
            parents: [parent1, parent2],
            grandparents: getAncestors([parent1, parent2], 1),
            greatGrandparents: getAncestors([parent1, parent2], 2),
            greatGreatGrandparents: getAncestors([parent1, parent2], 3),
            greatGreatGreatGrandparents: getAncestors([parent1, parent2], 4),
            greatGreatGreatGreatGrandparents: getAncestors([parent1, parent2], 5)
        },
        rarity: determineRarity(),

        const playerQuests = {
            active: [
                {
                    id: 1,
                    name: 'Find the Lost Pet',
                    description: 'Help find the lost pet in the forest.',
                    objectives: ['Go to the forest', 'Find clues', 'Locate the pet'],
                    rewards: ['100 gold', 'Rare item'],
                    status: 'In Progress',
                    category: 'Main Quest'
                },
                {
                    id: 2,
                    name: 'Collect Magical Herbs',
                    description: 'Collect 10 magical herbs from the meadow.',
                    objectives: ['Go to the meadow', 'Collect 10 herbs'],
                    rewards: ['50 gold', 'Potion'],
                    status: 'In Progress',
                    category: 'Side Quest'
                }
            ],
            completed: []
        },
        
        function displayQuests() {
            const mainQuestList = document.getElementById('mainQuestList');
            const sideQuestList = document.getElementById('sideQuestList');
            const completedQuestList = document.getElementById('completedQuestList');
        
            mainQuestList.innerHTML = playerQuests.active
                .filter(quest => quest.category == 'Main Quest')
                .map(quest => `
                    <div class="quest">
                        <h3>${quest.name}</h3>
                        <p>${quest.description}</p>
                        <p>Objectives: ${quest.objectives.join(', ')}</p>
                        <p>Rewards: ${quest.rewards.join(', ')}</p>
                        <p>Status: ${quest.status}</p>
                        <button onclick="completeQuest(${quest.id})">Complete Quest</button>
                    </div>
                `).join('');
        
            sideQuestList.innerHTML = playerQuests.active
                .filter(quest => quest.category == 'Side Quest')
                .map(quest => `
                    <div class="quest">
                        <h3>${quest.name}</h3>
                        <p>${quest.description}</p>
                        <p>Objectives: ${quest.objectives.join(', ')}</p>
                        <p>Rewards: ${quest.rewards.join(', ')}</p>
                        <p>Status: ${quest.status}</p>
                        <button onclick="completeQuest(${quest.id})">Complete Quest</button>
                    </div>
                `).join('');
        
            completedQuestList.innerHTML = playerQuests.completed.map(quest => `
                <div class="quest">
                    <h3>${quest.name}</h3>
                    <p>${quest.description}</p>
                    <p>Rewards: ${quest.rewards.join(', ')}</p>
                    <p>Status: Completed</p>
                </div>
            `).join('');
        }
        
        function completeQuest(questId) {
            const questIndex = playerQuests.active.findIndex(q => q.id == questId);
            if (questIndex !== -1) {
                const quest = playerQuests.active.splice(questIndex, 1)[0];
                quest.status = 'Completed';
                playerQuests.completed.push(quest);
                alert(`Quest "${quest.name}" completed! You received: ${quest.rewards.join(', ')}`);
                displayQuests();
            }
        }
        
        function signUp() {
            const email = document.getElementById('signUpEmail').value;
            const username = document.getElementById('signUpUsername').value;
            const password = document.getElementById('signUpPassword').value;
        
            if (email && username && password) {
                // Check if email or username is already in use
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const storedUser = JSON.parse(localStorage.getItem(key));
                    if (storedUser.email == email) {
                        alert('This email is already in use. Please use a different email.');
                        return;
                    }
                    if (storedUser.username == username) {
                        alert('This username is already in use. Please use a different username.');
                        return;
                    }
                }
        
                const user = {
                    email: email,
                    username: username,
                    password: password,
                    progress: {} // Initialize an empty object to store game progress
                };
        
                localStorage.setItem(email, JSON.stringify(user));
                alert('Sign-up successful! You can now log in.');
            } else {
                alert('Please fill in all fields.');
            }
        }
        
        function logIn() {
            const email = document.getElementById('logInEmail').value;
            const password = document.getElementById('logInPassword').value;
        
            const storedUser = localStorage.getItem(email);
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.password == password) {
                    alert('Log-in successful! Welcome back, ' + user.username);
                    // You can now access user.progress to retrieve and update game progress
                } else {
                    alert('Incorrect password. Please try again.');
                }
            } else {
                alert('No account found with this email. Please sign up first.');
            }
        }
        
        // Example usage
        document.addEventListener('DOMContentLoaded', displayQuests);        
