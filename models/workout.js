const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const exerciseTypes = ["cardio", "resistance"]
const isCardio = function () {
    return this.type === "cardio"
}
const isResistance = function () {
    return this.type === "resistance"
}

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: true,
            enum: exerciseTypes
        },
        name: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
            required: isCardio
        },
        weight: {
            type: Number,
            required: isResistance
        },
        reps: {
            type: Number,
            required: isResistance
        },
        sets: {
            type: Number,
            required: isResistance
        }
    }]
}, {
    toJSON: { virtuals: true },
    id: false
}
)
workoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.reduce((sum, exercise) => sum + exercise.duration, 0)
});

const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout;