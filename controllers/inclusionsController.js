const mongoose = require('mongoose');
const Inclusion = mongoose.model('Inclusion');

// Add a new inclusion
exports.addInclusion = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const newInclusion = new Inclusion({ name, description, category });
    await newInclusion.save();
    res.status(201).json(newInclusion);
  } catch (error) {
    console.error('Error adding inclusion:', error);
    res.status(500).json({ message: 'Failed to add inclusion', error: error.message });
  }
};

// Get all inclusions
exports.getAllInclusions = async (req, res) => {
  try {
    const inclusions = await Inclusion.find();
    res.status(200).json(inclusions);
  } catch (error) {
    console.error('Error fetching inclusions:', error);
    res.status(500).json({ message: 'Failed to fetch inclusions', error: error.message });
  }
};

// Update an inclusion
exports.updateInclusion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;
    const updatedInclusion = await Inclusion.findByIdAndUpdate(
      id,
      { name, description, category },
      { new: true, runValidators: true }
    );
    if (!updatedInclusion) {
      return res.status(404).json({ message: 'Inclusion not found' });
    }
    res.status(200).json(updatedInclusion);
  } catch (error) {
    console.error('Error updating inclusion:', error);
    res.status(500).json({ message: 'Failed to update inclusion', error: error.message });
  }
};

// Delete an inclusion
exports.deleteInclusion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInclusion = await Inclusion.findByIdAndDelete(id);
    if (!deletedInclusion) {
      return res.status(404).json({ message: 'Inclusion not found' });
    }
    res.status(200).json({ message: 'Inclusion deleted successfully' });
  } catch (error) {
    console.error('Error deleting inclusion:', error);
    res.status(500).json({ message: 'Failed to delete inclusion', error: error.message });
  }
};
