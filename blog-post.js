document.addEventListener('DOMContentLoaded', function() {
    // Social Sharing Buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.classList.contains('facebook') ? 'facebook' :
                         this.classList.contains('twitter') ? 'twitter' :
                         this.classList.contains('linkedin') ? 'linkedin' :
                         this.classList.contains('email') ? 'email' : 'link';
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent("Check out this article from CityScape Properties");
            
            let shareUrl = '';
            
            switch(type) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
                    break;
                case 'link':
                    // Copy to clipboard
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        const tooltip = document.createElement('span');
                        tooltip.textContent = 'Link copied!';
                        tooltip.style.position = 'absolute';
                        tooltip.style.background = 'var(--primary-color)';
                        tooltip.style.color = 'white';
                        tooltip.style.padding = '5px 10px';
                        tooltip.style.borderRadius = '4px';
                        tooltip.style.fontSize = '0.8rem';
                        tooltip.style.top = '-40px';
                        tooltip.style.left = '50%';
                        tooltip.style.transform = 'translateX(-50%)';
                        
                        this.appendChild(tooltip);
                        setTimeout(() => tooltip.remove(), 2000);
                    });
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
    
    // Comment Form Submission
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const commentText = formData.get('comment');
            
            // In a real implementation, you would send this to your server
            console.log('New comment submitted:', { name, commentText });
            
            // Create a new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="comment-header">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random" alt="${name}" class="comment-avatar">
                    <div class="comment-author">
                        <h4>${name}</h4>
                        <span class="comment-date">Just now</span>
                    </div>
                </div>
                <div class="comment-body">
                    <p>${commentText}</p>
                </div>
                <div class="comment-actions">
                    <a href="#" class="reply-link">Reply</a>
                    <a href="#" class="like-link"><i class="far fa-thumbs-up"></i> 0</a>
                </div>
            `;
            
            // Add the new comment to the top of the comments list
            const commentsList = document.querySelector('.comments-list');
            commentsList.insertBefore(newComment, commentsList.firstChild);
            
            // Update comment count
            const commentCount = document.querySelector('.comment-count');
            const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
            commentCount.textContent = `(${currentCount + 1} Comments)`;
            
            // Reset the form
            this.reset();
            
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for your comment!';
            successMessage.style.color = 'var(--secondary-color)';
            successMessage.style.marginTop = '15px';
            successMessage.style.fontWeight = '500';
            
            // Remove any existing messages
            const existingMessage = this.querySelector('.success-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            this.appendChild(successMessage);
            successMessage.classList.add('success-message');
        });
    }
    
    // Like functionality for comments
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('like-link') || e.target.closest('.like-link')) {
            e.preventDefault();
            const likeLink = e.target.classList.contains('like-link') ? e.target : e.target.closest('.like-link');
            const likeCount = likeLink.querySelector('i') ? likeLink : likeLink.querySelector('span');
            const currentLikes = parseInt(likeCount.textContent);
            
            likeCount.innerHTML = `<i class="far fa-thumbs-up"></i> ${currentLikes + 1}`;
            likeLink.style.pointerEvents = 'none';
            likeLink.style.opacity = '0.7';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Table of contents generation (optional)
    // This would create links to all h2 headings in the article
    const headings = document.querySelectorAll('.post-content h2');
    if (headings.length > 2) {
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
        
        headings.forEach(heading => {
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
            }
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            li.appendChild(a);
            toc.querySelector('ul').appendChild(li);
        });
        
        document.querySelector('.post-content').insertBefore(toc, document.querySelector('.post-content').firstChild);
    }
});
