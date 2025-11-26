const companyItems = document.querySelectorAll('.company-item');
const emptyState = document.getElementById('emptyState');
const detailsContent = document.getElementById('detailsContent');
const companyName = document.getElementById('companyName');
const headquarters = document.getElementById('headquarters');
const typesList = document.getElementById('typesList');
const description = document.getElementById('description');

// Function to extract text from Lexical format description
function extractDescription(descObj) {
    if (!descObj || !descObj.root || !descObj.root.children) {
        return 'No description available';
    }
    
    let text = '';
    descObj.root.children.forEach(child => {
        if (child.children) {
            child.children.forEach(textNode => {
                if (textNode.text) {
                    text += textNode.text + ' ';
                }
            });
        }
    });
    
    return text.trim() || 'No description available';
}

companyItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        companyItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');

        // Get entity data
        const index = this.getAttribute('data-index');
        const entity = entities[index];

        // Show details panel
        emptyState.classList.add('hidden');
        detailsContent.classList.remove('hidden');

        // Populate company name
        companyName.textContent = entity.name;

        // Populate headquarters
        if (entity.headquarters && entity.headquarters.name) {
            headquarters.textContent = entity.headquarters.name;
        } else {
            headquarters.textContent = 'Not specified';
        }

        // Populate types
        typesList.innerHTML = '';
        if (entity.types && entity.types.length > 0) {
            entity.types.forEach(type => {
                const badge = document.createElement('span');
                badge.className = 'type-badge';
                badge.textContent = typeof type === 'string' ? type : type.name;
                typesList.appendChild(badge);
            });
        } else {
            typesList.innerHTML = '<p>No surveillance types specified</p>';
        }

        // Populate description
        description.textContent = extractDescription(entity.description);
    });
});