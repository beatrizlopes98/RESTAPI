const Event = require('../models/eventModel')

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (events.length === 0) {
      return res.status(404).json({ success: false, msg: "No events found." });
    }
    return res.status(200).json({ success: true, events });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message || "Failed to fetch accommodations." });
  }
};
  
  exports.getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ success: false, msg: "Event not found." });
      }
      return res.status(200).json({ success: true, event });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message || "Failed to fetch accommodation." });
    }
  };
  
  exports.createEvent = async (req, res) => {
    try {
        // Extract the event details from the request body
        const { title, description, date, location, typeEvent } = req.body;
        const UserId = req.loggedUserId
        const UserType = req.loggedUserType

        if (UserType!=="owner") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        if ( !title || !date || !location || !typeEvent) {
            return res.status(400).json({ success: false, msg: 'Missing required fields' });
          }
          
    
        // Create a new event document
        const event = new Event({
          userId: UserId,
          title,
          description,
          date,
          location,
          typeEvent,
          likes: 0,
        });
    
        // Save the event to MongoDB
        await event.save();
    
        // Return a success response
        res.status(201).json({ success: true, event });
    
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating event:', error);
    
        // Return an error response
        res.status(500).json({ success: false, msg: 'Failed to create event' });
      }
    };
  
  exports.updateEvent = async (req, res) => {
    const eventId = req.params.id;
    // Implement the logic to update an event by ID
    res.send(`Update event with ID ${eventId}`);
  };
  
  exports.deleteEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const userId = req.loggedUserId; // Assuming you have the logged-in user's ID available
      
      // Find the accommodation by ID
      const event = await Event.findById(eventId);
      
      if (!event) {
        return res.status(404).json({ success: false, msg: "Event not found." });
      }
      
      // Check if the user is the owner or admin
      if (event.userId !== userId || req.loggedUserType == "student") {
        return res.status(403).json({ success: false, msg: "Unauthorized to delete the event." });
      }
      
      // Delete the accommodation
      await Event.findByIdAndDelete(eventId);
      
      return res.status(200).json({ success: true, msg: "Event deleted successfully." });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message || "Failed to delete the event." });
    }
  };
  