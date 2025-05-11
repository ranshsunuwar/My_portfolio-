// Admin Authentication
function checkAdmin() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminControls = document.getElementById('admin-controls');
    if (adminControls) {
        adminControls.style.display = isAdmin ? 'block' : 'none';
    }
    if (isAdmin) {
        loadAdminSkills();
        loadAdminProjects();
    }
}

// Simple Admin Login (for demo purposes)
function adminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'ransh123') { // Replace with a secure method in production
        localStorage.setItem('isAdmin', 'true');
        alert('Logged in as admin!');
        checkAdmin();
    } else {
        alert('Incorrect password.');
    }
}

// Admin Logout
function adminLogout() {
    localStorage.removeItem('isAdmin');
    alert('Logged out.');
    checkAdmin();
    window.location.reload();
}

// Add login/logout buttons to navbar
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const authDiv = document.createElement('div');
    authDiv.classList.add('auth-controls');
    authDiv.innerHTML = `
        <button onclick="adminLogin()" id="login-btn" style="display: ${localStorage.getItem('isAdmin') === 'true' ? 'none' : 'inline-block'}; margin-left: 1rem; padding: 0.5rem; background: #00C4B4; color: #fff; border: none; border-radius: 5px;">Admin Login</button>
        <button onclick="adminLogout()" id="logout-btn" style="display: ${localStorage.getItem('isAdmin') === 'true' ? 'inline-block' : 'none'}; margin-left: 1rem; padding: 0.5rem; background: #ff4d4d; color: #fff; border: none; border-radius: 5px;">Logout</button>
    `;
    nav.appendChild(authDiv);
    checkAdmin();
});

// Hamburger Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Chatbot Functionality
document.getElementById('chatbot').addEventListener('click', function() {
    document.getElementById('chatbox').style.display = 'block';
});

document.getElementById('chatbox-close').addEventListener('click', function() {
    document.getElementById('chatbox').style.display = 'none';
});

// Pre-defined chatbot questions and answers
const chatbotResponses = {
    "who are you": "I am Ransh, a future software engineer and web developer. I am passionate about learning new technologies and building functional websites.",
    "what is your educational background": "I am currently pursuing a BCA (Bachelor of Computer Applications) and I am in my 3rd year. I am learning programming languages, web development, and AI.",
    "what are your skills": "I have skills in C, C++, C#, HTML, CSS, JavaScript, PHP, React, Python, and various web development tools. I am also gaining knowledge in AI, machine learning, and data structures.",
    "what projects have you worked on": "I have worked on several projects, including an E-commerce website, a mobile shop website, and an employee management system. You can find more details on my portfolio page.",
    "what are your goals for the future": "My future goal is to become a software engineer, specializing in Artificial Intelligence and Machine Learning. I also plan to pursue a Master's in IT after completing my BCA.",
    "how can i contact you": "You can contact me through the contact form on my website, or you can send me a message directly. I will respond to your inquiry as soon as possible.",
    "what are your hobbies": "In my free time, I love working on coding projects, learning new technologies, and solving programming challenges. I also enjoy playing games and watching tech-related content.",
    "where do you study": "I study at [University Name], pursuing a Bachelor of Computer Applications (BCA).",
    "do you have any certifications": "Yes, I have completed online courses and certifications in web development, programming languages, and machine learning. I am always looking for opportunities to improve my skills.",
    "how can i collaborate with you on a project": "You can reach out to me via the contact form on my website, or you can message me directly through this chat. I'd love to discuss any project collaboration opportunities."
};

// Populate chat questions
function populateChatQuestions() {
    const chatQuestionsDiv = document.getElementById('chat-questions');
    Object.keys(chatbotResponses).forEach(question => {
        const button = document.createElement('button');
        button.classList.add('chat-question-btn');
        if (question.length > 25) {
            button.classList.add('span-full');
        }
        button.textContent = question.charAt(0).toUpperCase() + question.slice(1);
        button.onclick = () => {
            document.getElementById('chat-input').value = question;
            sendChatMessage();
        };
        chatQuestionsDiv.appendChild(button);
    });
}

// Send message to chatbot
function sendChatMessage(event) {
    if (event) {
        event.preventDefault();
    }

    const input = document.getElementById('chat-input');
    const message = input.value.trim().toLowerCase();

    if (message) {
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        userMessage.textContent = message;
        document.getElementById('chatbox').appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.classList.add('chat-message', 'bot');
        let response = "I'm here to help! Try asking about my skills, projects, education, or how to collaborate.";
        for (let question in chatbotResponses) {
            if (message.includes(question)) {
                response = chatbotResponses[question];
                break;
            }
        }
        botMessage.textContent = response;

        document.getElementById('chatbox').appendChild(botMessage);
        document.getElementById('chat-input').value = '';
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
    }
}

// Handle contact form submission with EmailJS
function sendContactMessage(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => {
        alert('Message sent successfully!');
        form.reset();
    }, (error) => {
        alert('Failed to send message: ' + JSON.stringify(error));
    });
}

// Allow sending chat message with Enter key
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendChatMessage(e);
    }
});

// Fix chatbot position above footer
window.addEventListener('scroll', function() {
    var footer = document.querySelector('footer');
    var chatbox = document.getElementById('chatbox');
    var footerPosition = footer.getBoundingClientRect();
    var chatboxPosition = chatbox.getBoundingClientRect();

    if (chatboxPosition.bottom > footerPosition.top && chatbox.style.display === 'block') {
        chatbox.style.bottom = (footerPosition.top - chatboxPosition.height - 10) + 'px';
    } else {
        chatbox.style.bottom = '4.5rem';
    }
});

// Toggle skill form visibility
function toggleSkillForm() {
    const form = document.getElementById('add-skill-form');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

// Add new skill
function addNewSkill(event) {
    event.preventDefault();
    const name = document.getElementById('skill-name').value;
    const icon = document.getElementById('skill-icon').value;
    if (name && icon) {
        const skills = JSON.parse(localStorage.getItem('adminSkills') || '[]');
        skills.push({ name, icon });
        localStorage.setItem('adminSkills', JSON.stringify(skills));
        document.getElementById('add-skill-form').reset();
        toggleSkillForm();
        loadAdminSkills();
    }
}

// Delete skill
function deleteSkill(index) {
    const skills = JSON.parse(localStorage.getItem('adminSkills') || '[]');
    skills.splice(index, 1);
    localStorage.setItem('adminSkills', JSON.stringify(skills));
    loadAdminSkills();
}

// Load admin skills
function loadAdminSkills() {
    const adminSkillsDiv = document.getElementById('admin-skills');
    if (!adminSkillsDiv) return;
    adminSkillsDiv.innerHTML = '';
    const skills = JSON.parse(localStorage.getItem('adminSkills') || '[]');
    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i> ${skill.name}
            <button onclick="deleteSkill(${index})" style="margin-left: 0.5rem; padding: 0.2rem 0.5rem; background: #ff4d4d; color: #fff; border: none; border-radius: 3px; font-size: 0.8rem;">Delete</button>
        `;
        adminSkillsDiv.appendChild(skillItem);
    });
}

// Toggle project form visibility
function toggleProjectForm() {
    const form = document.getElementById('add-project-form');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

// Add new project
function addNewProject(event) {
    event.preventDefault();
    const title = document.getElementById('project-title').value;
    const icon = document.getElementById('project-icon').value;
    const desc = document.getElementById('project-desc').value;
    if (title && icon && desc) {
        const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
        projects.push({ title, icon, desc });
        localStorage.setItem('adminProjects', JSON.stringify(projects));
        document.getElementById('add-project-form').reset();
        toggleProjectForm();
        loadAdminProjects();
    }
}

// Delete project
function deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
    projects.splice(index, 1);
    localStorage.setItem('adminProjects', JSON.stringify(projects));
    loadAdminProjects();
}

// Load admin projects
function loadAdminProjects() {
    const adminProjectsDiv = document.getElementById('admin-projects');
    if (!adminProjectsDiv) return;
    adminProjectsDiv.innerHTML = '';
    const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <div class="icon"><i class="${project.icon}"></i></div>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <button onclick="deleteProject(${index})" style="margin-top: 0.5rem; padding: 0.5rem; background: #ff4d4d; color: #fff; border: none; border-radius: 5px; font-size: 0.9rem;">Delete</button>
        `;
        adminProjectsDiv.appendChild(projectCard);
    });
}

// Populate questions when the page loads
populateChatQuestions();