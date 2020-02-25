import * as axios from 'axios';
import config from '../../../config.json';

export function searchBook(query) {
  return new Promise((done, error) => {
    try {
      let url = config["bibserverURL"];
      url += "/api/books/?q=" + encodeURIComponent(query).replace(/%20/g, "+");

      axios.get(url)
        .then((response) => {
          for (let i = 0; i < response.data.length; ++i) {
            // Add on a nice formatted string for authors and reformat authors
            // list for easier access
            response.data[i].publisher_formatted = formatPublisher(response.data[i].publisher);
            response.data[i].authors_formatted = formatAuthors(response.data[i].authors);
            response.data[i].authors = convertAuthors(response.data[i].authors);
          }

          done(response.data);
        })
        .catch((err) => {
          error(err);
        });

    } catch (err) {
      error(err);
    }
  });
}

function formatAuthors(authors_list) {
  if (authors_list == undefined) {
    return "Unknown Author";
  }

  if (authors_list.length == 1) {
    return authors_list[0];
  } else if (authors_list.length == 2) {
    return authors_list.join(" & ");
  } else {
    return authors_list[0] + " et al.";
  }
}

function formatPublisher(publisher) {
  console.log("publisher", publisher);
  if (publisher == undefined) {
    return "Unknown Publisher";
  } else {
    return publisher;
  }
}

function convertAuthors(originalAuthors) {
  let authors = [];
  if (originalAuthors != undefined) {
    for (let result of originalAuthors) {
      let author = {};

      if (result.split(" ").length == 2) {
        // Do it in 1st, last name order
        author.type = "Person";
        author.full = result;
        [ author.first, author.last ] = result.split(" ");

      } else {
        // Add the whole thing
        author.type = "Other";
        author.full = result;
      }
      authors.push(author);
    }
  }
  return authors;
}
