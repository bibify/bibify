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
            // Add on a nice formatted string for authors
            response.data[i].authors_formatted = format_authors(response.data[i].authors);
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

function format_authors(authors_list) {
  if (authors_list.length == 1) {
    return authors_list[0];
  } else if (authors_list.length == 2) {
    return authors_list.join(" & ");
  } else {
    return authors_list[0] + " et al.";
  }
}
