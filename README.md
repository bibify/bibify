# Bibify: A free, open source citation generator. #
Bibify is an open source project meant to make generating
style-compliant citations easy and accessible.

The deployed production version of this ~~cite~~ site is here: https://bibify.org

- **Support for 9000+ styles** via CSL + citeproc-js
- **Book autocitation** via Google Books API
- **Website autocitation** via metascraper

## Integrating Bibify with your project ##
Bibify can help provide citation services for your own project.

Bibserver exposes API endpoints for citation; for more information,
[see here](https://gitlab.com/bibify/bibserver/-/wikis/home).

## Contributing ##
If you want to contribute to this project:
1. File an issue (left)
2. Fork it (top right)
3. Clone your fork
4. `npm install`
5. `export BIBSERVERURL=http://localhost:8000 (if you're running a local bibserver instance - otherwise defaults to api.bibify.org)`
6. `npm start` to start a development webserver
7. `git add . && git commit -m [message]` for edits
8. `git push`
9. Submit a merge request (left).

New contributions are welcome! If you have any questions, file an issue or email vwangsf@gmail.com.
