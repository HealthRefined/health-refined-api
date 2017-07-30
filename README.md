![LookBookHQ](http://static1.squarespace.com/static/55faf106e4b0f3b903028589/t/56004143e4b0dd4d54dd667c/1452718504707/?format=1500w)

# LookBookHQ Taxonodermy API


[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


**Table of Contents**

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running / Development](#running--development)
- [Running Tests](#running-tests)
- [RESTful Request and Response](#restful-request-and-response)
 
## Prerequisites

You will need the following things properly installed on your computer.

- [Git](http://git-scm.com/)
- [Node.js 6.10.2](http://nodejs.org/)
- [Yarn](https://yarnpkg.com)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

## Installation

Checkout the repository

```
git clone git@github.com:twg/lookbookhq-taxonodermy-api.git
cd lookbookhq-taxonodermy-api
```

Install dependencies

```
yarn
```

## Running / Development

For development environment with Vagrant, please see the [lookbookhq-taxonodermy-devops](https://github.com/twg/lookbookhq-taxonodermy-devops) repo

### Setup The Development Environment

Copy all the example config files

```
cp config/example-config.json config/development.json
cp config/example-config.json config/test.json
```

Edit each config files to fill in the proper values

```
vi config/development.json
vi config/test.json
```

### Run the development environment

Run migrations

```
yarn run db:migrate
```

Start the development server

```
yarn start
```

## Running Tests

```
yarn test
```

## RESTful Request and Response


<table>
  <thead>
    <tr>
      <th>End point</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>POST /</code></td>
      <td>
        <table>
          <thead>
            <tr>
              <th>Document Type</th>
              <th>curl Example</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>pdf</code></td>
              <td>
<pre>curl -X POST -H "Content-Type: application/json" -d '{
  "batchName":"name",
  "payloads":[
    {
      "documentType":"pdf",
      "url":"http://www.pdf995.com/samples/pdf.pdf"
    }
  ]
}' "http://localhost:3000/"</pre>
              </td>
              <td>This will use the DirectFileDownloader class to save the file as it is</td>
            </tr>
            <tr>
              <td><code>webpage</code></td>
              <td>
<pre>curl -X POST -H "Content-Type: application/json" -d '{
  "batchName":"name",
  "payloads":[
    {
      "documentType":"webpage",
      "url":"http://twg.io"
    }
  ]
}' "http://localhost:3000/"</pre>
              </td>
              <td>This will use the HTMLFileDownloader class. This class will use PhantomJS to render the actual page, execute any JS needed and then save the HTML output</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td><code>POST /find-or-create</code></td>
      <td>
      This endpoint allows a record to be found and returned or for a record to be created. This is mainly used for the frontend
      <p><strong>curl Example</strong></p>
<pre>curl -X POST -H "Content-Type: application/json" -d '{
  "batchName":"name",
  "documentType":"pdf",
  "url":"http://www.pdf995.com/samples/pdf.pdf"
}' "http://localhost:3000/find-or-create"</pre>
      </td>
    </tr>
    <tr>
      <td><code>POST /upload</code></td>
      <td>
      This endpoint allows a plain text csv file to be uploaded and processed in bulk
      <p><strong>curl Example</strong></p>
<pre>curl -X POST -H "Cache-Control: no-cache" -H "Content-Type: multipart/form-data"  -F "batchName=name" -F "file=@sample.csv" "http://localhost:3000/upload"</pre>
<p><strong>sample.csv</strong></p>
<pre>
pdf,http://example.com
webpage,http://example.com/example.pdf
</pre>
      </td>
    </tr>
  </tbody>
</table>
