// ─────────────────────────────────────────────────────────────
//  loader.js  —  Reads reviews.yml and renders reviews + gallery
// ─────────────────────────────────────────────────────────────

// ── Tiny YAML parser (handles the simple list format in reviews.yml) ──
function parseReviewsYAML(text) {
  const reviews = [];
  const blocks = text.split(/\n- /).filter(b => b.trim() && !b.trim().startsWith('#'));
  for (const block of blocks) {
    const name  = (block.match(/name:\s*"([^"]+)"/)  || [])[1] || '';
    const stars = parseInt((block.match(/stars:\s*(\d)/) || [])[1] || '5');
    const text  = (block.match(/text:\s*"([\s\S]+?)"(?:\n|$)/) || [])[1] || '';
    if (name) reviews.push({ name, stars, text });
  }
  return reviews;
}

// ── Render star icons ──
function starHTML(count) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star ${i < count ? 'filled' : ''}">&starf;</span>`
  ).join('');
}

// ── Load & render reviews ──
async function loadReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;

  try {
    const res  = await fetch('reviews.yml');
    const text = await res.text();
    const reviews = parseReviewsYAML(text);

    grid.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-stars">${starHTML(r.stars)}</div>
        <p class="review-text">"${r.text}"</p>
        <span class="review-name">— ${r.name}</span>
      </div>
    `).join('');
  } catch (e) {
    grid.innerHTML = '<p style="color:#aaa">Could not load reviews.</p>';
    console.error('Reviews load error:', e);
  }
}

// ── Load & render gallery ──
// GitHub Pages can't list directories, so we read a manifest file: images/manifest.txt
// Each line in manifest.txt is a filename, e.g.: detail-closeup.webp
async function loadGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  try {
    const res   = await fetch('images/manifest.txt');
    const text  = await res.text();
    const files = text.split('\n').map(l => l.trim()).filter(Boolean);

    if (files.length === 0) {
      grid.innerHTML = '<p style="color:#aaa">No images yet.</p>';
      return;
    }

    grid.innerHTML = files.map(f => `
      <div class="gallery-item">
        <img src="images/${f}" alt="Mr Detail Car Wash" loading="lazy" />
      </div>
    `).join('');
  } catch (e) {
    grid.innerHTML = '<p style="color:#aaa">Add photos to the images/ folder and list them in images/manifest.txt</p>';
    console.error('Gallery load error:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadReviews();
  loadGallery();
});
