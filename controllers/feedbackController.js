const Feedback = require("../models/Feedback");

class feedbackController {
    async addFeedback(req, res) {
        const feedback = req.body;
        await Feedback.create({
            name: feedback.name,
            email: feedback.email,
            feedback: feedback.feedback
        })
        .then((fb) => {
            return res.json({message: `Successfully added feedback!`});
        }).catch((error) =>
            res.status(400).json({
              message: "Feedback not successful added!",
              error: error.message,
            })
          );
    }
}

module.exports = new feedbackController();