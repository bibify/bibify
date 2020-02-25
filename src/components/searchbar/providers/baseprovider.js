export class BaseProvider {
  results = [];
  provides = "None"; // Doesn't provide anything

  addResult(thumbnail, title, author, date, publisher) {
    this.addResultObject({
      thumbnail: thumbnail,
      title: title,
      author: author,
      date: date,
      publisher: publisher,
    });
  }

  addResultObject(object) {
    this.results.push(object);
  }

  getResults() {
    /* This function should return a list of objects in the format
     * {
     *  thumbnail: "path_to_thumbnail.png",
     *  title: "title",
     *  author: "author",
     *  date: publication_date,
     *  publisher: "publisher"
     * }
     */
    return this.results;
  }
};
