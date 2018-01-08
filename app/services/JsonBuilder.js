import myFirebase from '../../connection';

class JsonBuilder {
  constructor() {
    this.favourites = [];
  }

  static buildExercise(name, type, bodyPart = "") {
    return {
      name,
      type,
      bodyPart
    };
  }

}

module.exports = JsonBuilder;
