# Mr Detail Car Wash — Website

## 📁 Folder Structure
```
mrdetail/
├── index.html          ← The website (don't need to edit this)
├── logo.png            ← Logo in the nav & footer
├── reviews.yml         ← ✏️  Edit this to add/change reviews
├── images/
│   ├── manifest.txt    ← ✏️  List every photo filename here (one per line)
│   ├── detail-closeup.webp
│   └── carwash-exterior.png
└── js/
    └── loader.js       ← Loads reviews + gallery automatically
```

---

## ✏️ Adding a New Review

Open `reviews.yml` and copy/paste this block at the bottom:

```yaml
- name: "Customer Name"
  stars: 5
  text: "Write the review text here."
```

That's it — save the file and the site updates automatically.

---

## 🖼️ Adding New Photos

1. Drop the photo file into the `images/` folder
2. Open `images/manifest.txt` and add the filename on a new line:

```
detail-closeup.webp
carwash-exterior.png
my-new-photo.jpg       ← add it here
```

Save — the gallery updates automatically.

---

## 🚀 Putting it on GitHub Pages

1. Create a free account at **github.com**
2. Click **New Repository** → name it `mrdetail` (or anything)
3. Upload all these files (drag & drop works)
4. Go to **Settings → Pages → Source → main branch / root**
5. Your site will be live at: `https://yourusername.github.io/mrdetail`

---

## 📞 Contact Info
To update the phone number, address, or hours — open `index.html` and search for the text you want to change.
