const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    URL: { type: String, required: false },
    image: {
      alt: { type: String, required: false },
      link: { type: String, required: false }
    }
  },
  { timestamps: true }
);

const Projects = mongoose.model("Projects", ProjectsSchema);

module.exports = Projects;