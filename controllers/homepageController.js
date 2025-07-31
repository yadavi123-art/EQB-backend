const { HomepageContent } = require('../schema.js');

// Function to sanitize input data
function sanitizeInput(data) {
  if (typeof data === 'string') {
    return data.replace(/[\"]/g, '\\$&'); // Escape double quotes
  }
  return data;
}

// Get all homepage content
exports.getAllHomepageContent = async (req, res) => {
  try {
    const homepageContent = await HomepageContent.find();
    res.json(homepageContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create new homepage content
exports.createHomepageContent = async (req, res) => {
  try {
    // Sanitize the input data
    const sanitizedData = {};
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        sanitizedData[key] = sanitizeInput(req.body[key]);
      }
    }

    const newHomepageContent = new HomepageContent(sanitizedData);
    const savedHomepageContent = await newHomepageContent.save();
    res.status(201).json(savedHomepageContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update homepage content
exports.updateHomepageContent = async (req, res) => {
  try {
    // Sanitize the input data
    const sanitizedData = {};
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        sanitizedData[key] = sanitizeInput(req.body[key]);
      }
    }

    const homepageContent = await HomepageContent.findByIdAndUpdate(req.params.id, sanitizedData, { new: true });
    if (!homepageContent) {
      return res.status(404).send('Homepage content item not found');
    }
    res.json(homepageContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Delete homepage content
exports.deleteHomepageContent = async (req, res) => {
  try {
    const homepageContent = await HomepageContent.findByIdAndDelete(req.params.id);
    if (!homepageContent) {
      return res.status(404).send('Homepage content item not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
