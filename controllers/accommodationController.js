
const Accommodation = require('../models/accommodationModel');

exports.getAccommodations = async(req, res) => {
    try {
        const accommodations = await Accommodation.find();
        if (accommodations.length === 0) {
          return res.status(404).json({ success: false, msg: "No accommodations found." });
        }
        return res.status(200).json({ success: true, accommodations });
      } catch (err) {
        return res.status(500).json({ success: false, msg: err.message || "Failed to fetch accommodations." });
      }
    };
  
  exports.getAccommodationById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
          return res.status(404).json({ success: false, msg: "Accommodation not found." });
        }
        return res.status(200).json({ success: true, accommodation });
      } catch (err) {
        return res.status(500).json({ success: false, msg: err.message || "Failed to fetch accommodation." });
      }
    };
  
  exports.createAccommodation = async(req, res) => {
    try {
        // Extract the event details from the request body
        const { title, description, photo, location, price, numRooms, numPeople, classification, typeAccommodation } = req.body;
        const UserId = req.loggedUserId
        const UserType = req.loggedUserType

        if (UserType!=="owner") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        if ( !title ||  !location || !price|| !numRooms||!numPeople|| !typeAccommodation) {
            return res.status(400).json({ success: false, msg: 'Missing required fields' });
          }
          
    
        // Create a new event document
        const accommodation = new Accommodation({
          userId: UserId,
          title,
          description,
          photo,
          location,
          availability: true,
          price,
          numRooms,
          numPeople,
          classification,
          typeAccommodation
        });
    
        // Save the event to MongoDB
        await accommodation.save();
    
        // Return a success response
        res.status(201).json({ success: true, accommodation});
    
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating accommodation:', error);
    
        // Return an error response
        res.status(500).json({ success: false, msg: 'Failed to create accommodation' });
      }
    };
  
  exports.updateAccommodation = (req, res) => {
    const accommodationId = req.params.id;
    // Implement the logic to update an accommodation by ID
    res.send(`Update accommodation with ID ${accommodationId}`);
  };
  
  exports.deleteAccommodation = async (req, res) => {
    try {
        const accommodationId = req.params.id;
        const userId = req.loggedUserId; // Assuming you have the logged-in user's ID available
        
        // Find the accommodation by ID
        const accommodation = await Accommodation.findById(accommodationId);
        
        if (!accommodation) {
          return res.status(404).json({ success: false, msg: "Accommodation not found." });
        }
        
        // Check if the user is the owner or admin
        if (accommodation.userId !== userId || req.loggedUserType == "student") {
          return res.status(403).json({ success: false, msg: "Unauthorized to delete the accommodation." });
        }
        
        // Delete the accommodation
        await Accommodation.findByIdAndDelete(accommodationId);
        
        return res.status(200).json({ success: true, msg: "Accommodation deleted successfully." });
      } catch (err) {
        return res.status(500).json({ success: false, msg: err.message || "Failed to delete the accommodation." });
      }
    };

    
    
    
    
    
    
  