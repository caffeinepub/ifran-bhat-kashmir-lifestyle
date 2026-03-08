# Ifran Bhat – Kashmiri Lifestyle Creator Website

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- **Hero Section**: Full-viewport header with a Kashmir/Himalayan landscape image, overlaid with title "Living the Kashmiri Dream: The Journey of Ifran Bhat" and a brief tagline.
- **Navigation**: Sticky top nav with links to all sections (Home, About, Gallery, Blog, Contact) and creator name/logo.
- **About Me**: Storytelling section with portrait placeholder, narrative text about roots in South Kashmir, Anantnag, personal philosophy.
- **Lifestyle Gallery**: Responsive grid of photo and short-form video cards. Supports filtering by category (Photos / Videos). Clicking opens a lightbox/modal preview.
- **Blog/Vlog Section**: Card-based layout listing blog/vlog posts with title, category tag, excerpt, date, and read-more link. Sample posts cover local culture, personal milestones, daily routines.
- **Contact Section**: Simple form (Name, Email, Message, Submit) for collaboration inquiries plus social media icon links (Instagram, YouTube, Twitter/X, Facebook).
- **Footer**: Copyright, creator name, quick nav links.
- Backend: Stores contact form submissions and blog posts. Provides read endpoints for blog posts and write endpoint for contact submissions.

### Modify
- Nothing (new project).

### Remove
- Nothing (new project).

## Implementation Plan
1. Generate Kashmir landscape hero image, gallery sample images.
2. Select no additional Caffeine components (basic backend sufficient).
3. Generate Motoko backend with: `BlogPost` type (id, title, category, excerpt, content, date, imageUrl, isVlog), `ContactMessage` type (name, email, message, timestamp). Endpoints: `getBlogPosts`, `submitContact`.
4. Build React frontend:
   - Sticky nav with smooth scroll to sections.
   - Hero with full-bleed image and text overlay.
   - About section with narrative and accent elements.
   - Gallery grid with photo/video cards and modal lightbox.
   - Blog section with card grid, category tags.
   - Contact section with controlled form and social links.
   - Footer.
5. Deploy draft.
