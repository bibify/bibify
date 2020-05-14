import webpack from 'webpack';

const config = {
  "resolve": {
    "alias": {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
     // Must be below test-utils
    },
    plugins: [
      new webpack.EnvironmentPlugin({'BIBSERVERURL': 'http://localhost:8000'})
    ]
  }
}
