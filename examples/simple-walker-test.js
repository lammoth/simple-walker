'use strict';

import walker from '../src/walker';
import minimist from 'minimist';


(function() {
  'use strict';
  
  const argv = minimist(process.argv.slice(2));

  console.log(
    walker(
      argv.location,
      argv.dir,
      argv.file,
    )
  );
}());