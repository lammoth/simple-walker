# simple-walker

simple-walker is a nodejs synchronous walker to search files inside dirs. It's specially designed to load dynamic files, like routes, modules, etc. 

### Installation

You can download the repository or simply install this module through npm:

    npm install simple-walker

### Usage

Include the module through `import`: 

    import walker from 'simple-walker';

You then have a reference to a function, which takes the following arguments:

    walker ( path, dirname, filename );

Whereas `path` is the location to inspect, `dirname` is the dirname to search and `filename` is the filename to search inside dirname.

### Example

```javascript
  // Import the package
  import walker from 'simple-walker';
  
  // Apps endopoints
  const appsRoutes = walker(
    path.join('/project_name', '/apps'),
    'endpoints',
    'routes.js'
  );
  
  export default function(app) {
    // Initialize Express's routes
    for (let route of appsRoutes) {
      app.use(`/api/v1/`, require(route.path));
    }
  }
```
  
  
