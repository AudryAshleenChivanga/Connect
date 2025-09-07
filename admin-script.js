// Admin Panel JavaScript
// Handles authentication, CRUD operations, and data management

class AdminManager {
    constructor() {
        this.isLoggedIn = false;
        this.resources = [];
        this.currentUser = null;
        this.init();
    }

    init() {
        console.log('AdminManager initializing...');
        this.checkAuth();
        this.setupEventListeners();
        this.loadResources();
        this.updateDashboard();
        console.log('AdminManager initialized');
    }

    // Authentication
    checkAuth() {
        console.log('Checking authentication...');
        const authData = localStorage.getItem('admin_auth');
        console.log('Auth data:', authData);

        if (authData) {
            try {
                const auth = JSON.parse(authData);
                console.log('Parsed auth:', auth);

                if (auth.loggedIn && auth.expiry > Date.now()) {
                    console.log('Valid session found, showing admin interface');
                    this.isLoggedIn = true;
                    this.currentUser = auth.user;
                    this.showAdminInterface();
                    return;
                } else {
                    console.log('Session expired or invalid');
                    localStorage.removeItem('admin_auth');
                }
            } catch (error) {
                console.error('Error parsing auth data:', error);
                localStorage.removeItem('admin_auth');
            }
        }

        console.log('No valid session, showing login modal');
        this.showLoginModal();
    }

    showLoginModal() {
        document.getElementById('loginModal').style.display = 'flex';
        document.getElementById('adminInterface').style.display = 'none';
    }

    closeLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
    }

    async login(username, password) {
        try {
            // Simple authentication (in production, use proper backend)
            const defaultCredentials = {
                username: 'admin',
                password: 'ashletech2025'
            };

            if (username === defaultCredentials.username && password === defaultCredentials.password) {
                this.isLoggedIn = true;
                this.currentUser = { username };
                const authData = {
                    loggedIn: true,
                    user: this.currentUser,
                    expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
                };
                localStorage.setItem('admin_auth', JSON.stringify(authData));
                this.showAdminInterface();
                this.showMessage('Login successful!', 'success');
                return true;
            } else {
                this.showMessage('Invalid credentials. Please check username and password.', 'error');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Login failed. Please try again.', 'error');
            return false;
        }
    }

    logout() {
        localStorage.removeItem('admin_auth');
        this.isLoggedIn = false;
        this.currentUser = null;
        this.showLoginModal();
    }

    showAdminInterface() {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('adminInterface').style.display = 'block';
        this.updateDashboard();
    }

    // Navigation
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                console.log('Attempting login with:', username);

                this.login(username, password).then(success => {
                    console.log('Login result:', success);
                    if (!success) {
                        this.showMessage('Invalid credentials. Please check username and password.', 'error');
                    }
                }).catch(error => {
                    console.error('Login error:', error);
                    this.showMessage('Login failed. Please try again.', 'error');
                });
            });
        } else {
            console.error('Login form not found');
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.dataset.section);
            });
        });

        // Resource form
        document.getElementById('resource-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveResource();
        });

        // Search and filters
        document.getElementById('resource-search').addEventListener('input', () => {
            this.filterResources();
        });

        document.getElementById('category-filter').addEventListener('change', () => {
            this.filterResources();
        });

        // Settings forms
        document.getElementById('admin-settings').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateAdminSettings();
        });

        document.getElementById('platform-settings').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updatePlatformSettings();
        });
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        // Special handling for different sections
        if (sectionName === 'resources') {
            this.displayResources();
        }
    }

    // Resource Management
    loadResources() {
        // Load from localStorage first, then fallback to default resources
        const savedResources = localStorage.getItem('srhr_resources');
        if (savedResources) {
            this.resources = JSON.parse(savedResources);
        } else {
            // Load default resources
            this.resources = this.getDefaultResources();
            this.saveResourcesToStorage();
        }
        this.updateDashboard();
    }

    getDefaultResources() {
        return [
            {
                id: 1,
                title: 'Contraception Methods',
                description: 'Learn about different types of contraception and how to choose what\'s right for you.',
                icon: 'fas fa-shield-alt',
                tags: 'contraception birth-control family-planning',
                category: 'Family Planning',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 2,
                title: 'STI Prevention & Testing',
                description: 'Information about sexually transmitted infections, prevention, and testing services.',
                icon: 'fas fa-virus',
                tags: 'sti std prevention testing health',
                category: 'Sexual Health',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Menstrual Health',
                description: 'Understanding your menstrual cycle, managing periods, and reproductive health.',
                icon: 'fas fa-calendar-alt',
                tags: 'periods menstruation cycle health',
                category: 'Reproductive Health',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 4,
                title: 'Pregnancy Planning',
                description: 'Resources for those planning pregnancy or wanting to avoid unplanned pregnancy.',
                icon: 'fas fa-baby',
                tags: 'pregnancy planning fertility family',
                category: 'Family Planning',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 5,
                title: 'Mental Health Support',
                description: 'Mental health resources and support for sexual and reproductive health concerns.',
                icon: 'fas fa-brain',
                tags: 'mental-health support counseling therapy',
                category: 'Mental Health',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 6,
                title: 'Gender & Sexuality',
                description: 'Information about gender identity, sexual orientation, and LGBTQ+ health.',
                icon: 'fas fa-rainbow',
                tags: 'gender sexuality lgbtq identity',
                category: 'Identity & Sexuality',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 7,
                title: 'Emergency Contraception',
                description: 'Information about emergency contraception options and when to use them.',
                icon: 'fas fa-exclamation-triangle',
                tags: 'emergency contraception morning-after pill',
                category: 'Emergency Care',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 8,
                title: 'Healthy Relationships',
                description: 'Building healthy relationships, consent, and communication skills.',
                icon: 'fas fa-heart',
                tags: 'relationships consent communication healthy',
                category: 'Relationships',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    saveResourcesToStorage() {
        localStorage.setItem('srhr_resources', JSON.stringify(this.resources));
    }

    saveResource() {
        const formData = new FormData(document.getElementById('resource-form'));
        const resource = {
            id: Date.now(), // Simple ID generation
            title: formData.get('title'),
            description: formData.get('description'),
            icon: formData.get('icon') || 'fas fa-book-open',
            tags: formData.get('tags'),
            category: formData.get('category'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.resources.push(resource);
        this.saveResourcesToStorage();
        this.clearForm();
        this.showMessage('Resource added successfully!', 'success');
        this.updateDashboard();
        this.logActivity('Added new resource: ' + resource.title);
    }

    editResource(id) {
        const resource = this.resources.find(r => r.id === id);
        if (resource) {
            document.getElementById('resource-title').value = resource.title;
            document.getElementById('resource-description').value = resource.description;
            document.getElementById('resource-icon').value = resource.icon;
            document.getElementById('resource-tags').value = resource.tags;
            document.getElementById('resource-category').value = resource.category;

            // Switch to add resource section
            this.switchSection('add-resource');

            // Update form to indicate edit mode
            const submitBtn = document.querySelector('#resource-form button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Resource';
            submitBtn.onclick = () => this.updateResource(id);
        }
    }

    updateResource(id) {
        const formData = new FormData(document.getElementById('resource-form'));
        const index = this.resources.findIndex(r => r.id === id);

        if (index !== -1) {
            this.resources[index] = {
                ...this.resources[index],
                title: formData.get('title'),
                description: formData.get('description'),
                icon: formData.get('icon'),
                tags: formData.get('tags'),
                category: formData.get('category'),
                updatedAt: new Date().toISOString()
            };

            this.saveResourcesToStorage();
            this.clearForm();
            this.showMessage('Resource updated successfully!', 'success');
            this.updateDashboard();
            this.logActivity('Updated resource: ' + this.resources[index].title);

            // Reset form
            const submitBtn = document.querySelector('#resource-form button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Resource';
            submitBtn.onclick = null;
        }
    }

    deleteResource(id) {
        if (confirm('Are you sure you want to delete this resource?')) {
            const resource = this.resources.find(r => r.id === id);
            this.resources = this.resources.filter(r => r.id !== id);
            this.saveResourcesToStorage();
            this.displayResources();
            this.showMessage('Resource deleted successfully!', 'success');
            this.updateDashboard();
            this.logActivity('Deleted resource: ' + resource.title);
        }
    }

    clearForm() {
        document.getElementById('resource-form').reset();
    }

    displayResources() {
        const tbody = document.getElementById('resources-table-body');
        tbody.innerHTML = '';

        const filteredResources = this.filterResources();

        filteredResources.forEach(resource => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>
                    <div class="resource-title">${resource.title}</div>
                </td>
                <td>
                    <span class="resource-category">${resource.category}</span>
                </td>
                <td>
                    <div class="resource-tags">
                        ${resource.tags.split(' ').map(tag =>
                            `<span class="tag">${tag}</span>`
                        ).join('')}
                    </div>
                </td>
                <td>${new Date(resource.updatedAt).toLocaleDateString()}</td>
                <td>
                    <div class="resource-actions">
                        <button class="btn-action btn-edit" onclick="adminManager.editResource(${resource.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-action btn-delete" onclick="adminManager.deleteResource(${resource.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            `;

            tbody.appendChild(row);
        });

        // Update category filter options
        this.updateCategoryFilter();
    }

    filterResources() {
        const searchTerm = document.getElementById('resource-search').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;

        let filtered = this.resources.filter(resource => {
            const matchesSearch = !searchTerm ||
                resource.title.toLowerCase().includes(searchTerm) ||
                resource.description.toLowerCase().includes(searchTerm) ||
                resource.tags.toLowerCase().includes(searchTerm);

            const matchesCategory = !categoryFilter || resource.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        if (document.querySelector('.content-section.active').id === 'resources-section') {
            this.displayFilteredResources(filtered);
        }

        return filtered;
    }

    displayFilteredResources(resources) {
        const tbody = document.getElementById('resources-table-body');
        tbody.innerHTML = '';

        resources.forEach(resource => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="resource-title">${resource.title}</div>
                </td>
                <td>
                    <span class="resource-category">${resource.category}</span>
                </td>
                <td>
                    <div class="resource-tags">
                        ${resource.tags.split(' ').map(tag =>
                            `<span class="tag">${tag}</span>`
                        ).join('')}
                    </div>
                </td>
                <td>${new Date(resource.updatedAt).toLocaleDateString()}</td>
                <td>
                    <div class="resource-actions">
                        <button class="btn-action btn-edit" onclick="adminManager.editResource(${resource.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-action btn-delete" onclick="adminManager.deleteResource(${resource.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateCategoryFilter() {
        const categoryFilter = document.getElementById('category-filter');
        const categories = [...new Set(this.resources.map(r => r.category))];

        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Dashboard
    updateDashboard() {
        // Update stats
        document.getElementById('total-resources').textContent = this.resources.length;

        const categories = [...new Set(this.resources.map(r => r.category))];
        document.getElementById('total-categories').textContent = categories.length;

        // Update activity log
        this.displayActivityLog();
    }

    logActivity(action) {
        const activities = JSON.parse(localStorage.getItem('admin_activities') || '[]');
        activities.unshift({
            action,
            timestamp: new Date().toISOString(),
            user: this.currentUser.username
        });

        // Keep only last 10 activities
        if (activities.length > 10) {
            activities.splice(10);
        }

        localStorage.setItem('admin_activities', JSON.stringify(activities));
        this.displayActivityLog();
    }

    displayActivityLog() {
        const activities = JSON.parse(localStorage.getItem('admin_activities') || '[]');
        const activityList = document.getElementById('activity-list');

        if (activities.length === 0) {
            activityList.innerHTML = '<p style="text-align: center; color: var(--admin-text-light); padding: 2rem;">No recent activity</p>';
            return;
        }

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="fas fa-user-edit"></i>
                <div class="activity-content">
                    <p class="activity-title">${activity.action}</p>
                    <p class="activity-time">${new Date(activity.timestamp).toLocaleString()}</p>
                </div>
            </div>
        `).join('');
    }

    // Import/Export
    exportData() {
        const data = {
            resources: this.resources,
            settings: this.getSettings(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `ashletech-srhr-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showMessage('Data exported successfully!', 'success');
    }

    importData() {
        const fileInput = document.getElementById('import-file');
        fileInput.click();

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        if (data.resources) {
                            this.resources = data.resources;
                            this.saveResourcesToStorage();
                            this.updateDashboard();
                            this.displayResources();
                            this.showMessage('Data imported successfully!', 'success');
                            this.logActivity('Imported data backup');
                        } else {
                            this.showMessage('Invalid file format', 'error');
                        }
                    } catch (error) {
                        this.showMessage('Error reading file', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
    }

    // Settings
    getSettings() {
        return JSON.parse(localStorage.getItem('admin_settings') || '{}');
    }

    updateAdminSettings() {
        const formData = new FormData(document.getElementById('admin-settings'));
        const settings = this.getSettings();

        settings.adminUsername = formData.get('username');
        if (formData.get('password')) {
            settings.adminPassword = formData.get('password'); // In production, hash this!
        }

        localStorage.setItem('admin_settings', JSON.stringify(settings));
        this.showMessage('Admin settings updated!', 'success');
    }

    updatePlatformSettings() {
        const formData = new FormData(document.getElementById('platform-settings'));
        const settings = this.getSettings();

        settings.siteTitle = formData.get('title');
        settings.contactEmail = formData.get('email');

        localStorage.setItem('admin_settings', JSON.stringify(settings));
        this.showMessage('Platform settings updated!', 'success');
    }

    // Utility functions
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Insert at top of admin content
        const adminContent = document.querySelector('.admin-content');
        adminContent.insertBefore(messageEl, adminContent.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    viewSite() {
        window.open('index.html', '_blank');
    }
}

// Global instance
const adminManager = new AdminManager();

// Make functions globally available for onclick handlers
window.adminManager = adminManager;
window.closeLoginModal = () => adminManager.closeLoginModal();
window.logout = () => adminManager.logout();
window.exportData = () => adminManager.exportData();
window.importData = () => adminManager.importData();
window.viewSite = () => adminManager.viewSite();
window.clearForm = () => adminManager.clearForm();
